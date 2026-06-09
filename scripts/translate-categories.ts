import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
// Use Service Role Key to bypass Row Level Security (RLS) for maintenance script.
// Fallback to VITE_SUPABASE_PUBLISHABLE_KEY if service role is not provided.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Key in environment variables.');
  process.exit(1);
}

if (!geminiApiKey) {
  console.error('Error: Missing GEMINI_API_KEY or VITE_GEMINI_API_KEY in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function translateText(text: string, targetLang: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are a professional translator. Translate the following category name or description into the target language code: "${targetLang}" (e.g., "es" for Spanish, "fr" for French, "it" for Italian). Return ONLY the translated string. Do not include any introduction, explanations, quotes, or formatting:\n\n${text}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} - ${await response.text()}`);
  }

  const result = await response.json();
  const translated = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!translated) {
    throw new Error('Empty response from Gemini API.');
  }

  return translated;
}

async function run() {
  // If we are using the public/publishable key, we may need to sign in to bypass RLS policies
  const isServiceRole = !supabaseKey.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNland2dm12ZGpuYmdyY2tqY3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwODY3MzAsImV4cCI6MjA5NDY2MjczMH0'); // checks if it is the public key we saw in .env
  
  if (!isServiceRole && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    console.log('Logging in as admin/operator to authenticate Supabase client...');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    if (signInError) {
      console.error('Failed to log in:', signInError.message);
      process.exit(1);
    }
    console.log('Login successful.');
  }

  console.log('Fetching active languages...');
  const { data: languages, error: langErr } = await supabase
    .from('languages')
    .select('*')
    .eq('is_active', true);

  if (langErr || !languages) {
    console.error('Failed to fetch languages:', langErr);
    process.exit(1);
  }

  console.log('Fetching categories...');
  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .select('*');

  if (catErr || !categories) {
    console.error('Failed to fetch categories:', catErr);
    process.exit(1);
  }

  console.log(`Found ${categories.length} categories. Checking for missing translations...`);

  let translatedCount = 0;

  for (const category of categories) {
    // Fetch existing translations for this category
    const { data: existingTranslations, error: transErr } = await supabase
      .from('category_translations')
      .select('*, languages(code)')
      .eq('category_id', category.id);

    if (transErr) {
      console.error(`Failed to fetch translations for category "${category.name}":`, transErr);
      continue;
    }

    const missingLangs = languages.filter((lang) => {
      // Skip the default language (English) as the source categories table holds English
      if (lang.is_default || lang.code === 'en') return false;
      return !existingTranslations?.some(
        (t) => t.language_id === lang.id || t.languages?.code === lang.code
      );
    });

    if (missingLangs.length === 0) {
      continue;
    }

    console.log(`\nCategory "${category.name}" is missing translations for: ${missingLangs.map((l) => l.code).join(', ')}`);

    for (const lang of missingLangs) {
      try {
        console.log(`Translating "${category.name}" to "${lang.code}"...`);
        const translatedName = await translateText(category.name, lang.code);
        
        let translatedDesc = '';
        if (category.description) {
          console.log(`Translating description to "${lang.code}"...`);
          translatedDesc = await translateText(category.description, lang.code);
        }

        console.log(`Saving translation for "${category.name}" in "${lang.code}"...`);
        const { error: insertErr } = await supabase
          .from('category_translations')
          .insert({
            category_id: category.id,
            language_id: lang.id,
            name: translatedName,
            description: translatedDesc || null,
          });

        if (insertErr) {
          console.error(`Failed to save translation to database:`, insertErr.message);
        } else {
          console.log(`Successfully translated and saved "${category.name}" for "${lang.code}".`);
          translatedCount++;
        }
      } catch (err: any) {
        console.error(`Failed to translate category "${category.name}" to "${lang.code}":`, err.message || err);
      }
    }
  }

  console.log(`\nCategory translation check complete. Added ${translatedCount} new translations.`);
}

run().catch((err) => {
  console.error('Unhandled script error:', err);
  process.exit(1);
});
