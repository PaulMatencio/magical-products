# Implementing OAuth Authentication with Supabase

This guide outlines how to configure, implement, and verify OAuth-based authentication (such as Google, GitHub, or Facebook) using **Supabase Auth**.

---

## 1. Supabase Dashboard Configuration

Before coding, you must register your application with the OAuth provider and configure Supabase.

### Step A: Configure Redirect URLs in Supabase
When authentication completes, Supabase redirects users back to your application.
1. Go to the **Supabase Dashboard** -> **Project Settings** -> **Auth**.
2. Under **Site URL**, enter your primary local or production URL (e.g., `http://localhost:3000` or `https://your-domain.com`).
3. Under **Redirect URLs**, add the exact target URLs where the user should land (e.g., `http://localhost:3000`, `http://localhost:3000/store`, or `https://paulmatencio.github.io/magical-products`). Do **NOT** use wildcards (such as `*` or `**`) as Supabase will reject them as invalid redirect URLs.

### Step B: Enable Providers
For each social login you wish to support:
1. Go to your provider's developer console (e.g., Google Cloud Console, GitHub Developer Settings).
2. Create an **OAuth Client ID / App** and set the Authorized Redirect URI to the Supabase callback URL. You can find this URL in the Supabase Dashboard under **Auth** -> **Providers** -> **[Your Provider]**. It usually looks like:
   `https://<project-ref>.supabase.co/auth/v1/callback`
3. Retrieve your provider's **Client ID** and **Client Secret**.
4. In the **Supabase Dashboard**, go to **Auth** -> **Providers** -> select the provider (e.g., Google or GitHub), enable it, and paste your **Client ID** and **Client Secret**. Save the changes.

---

## 2. Client-Side Implementation

With Supabase client SDK installed (`@supabase/supabase-js`), you can trigger the OAuth sign-in flow.

### Step A: Call `signInWithOAuth`
Call the client method with the provider and target redirect options.

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('SUPABASE_URL', 'SUPABASE_ANON_KEY');

async function handleOAuthLogin(provider: 'google' | 'github' | 'facebook') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      // Must match one of the Redirect URLs configured in the dashboard
      redirectTo: `${window.location.origin}/magical-products` 
    }
  });

  if (error) {
    console.error('OAuth sign in failed:', error.message);
    throw error;
  }

  // The client automatically redirects to the provider's login portal here.
  return data;
}
```

### Step B: Listen for Session Changes
When the provider redirects back, the URL hash contains access and refresh tokens. The Supabase client intercepts these, sets up a local session, and fires an authentication state change.

Listen to these changes in your app entry point or router:

```typescript
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    console.log('User signed in successfully:', session.user);
    // Update your application context/state with the user data
  }
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    // Clear user state
  }
});
```

---

## 3. How It Is Set Up In This Project

This codebase implements a repository pattern that cleanly wraps the Supabase Auth API:

### 1. Repository Layer
The **`SupabaseAuthRepository`** handles the lower-level Supabase Auth SDK call:
* Location: [SupabaseAuthRepository.ts](file:///home/paul/react/magical-products/src/infrastructure/repositories/SupabaseAuthRepository.ts#L29-L36)

```typescript
  async signInWithOAuth(provider: 'google' | 'github' | 'facebook'): Promise<any> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
    return data;
  }
```

### 2. Application Layer
The **`AuthenticateUseCase`** exposes this action as `socialLogin`:
* Location: [AuthenticateUseCase.ts](file:///home/paul/react/magical-products/src/application/use-cases/auth/AuthenticateUseCase.ts#L37-L43)

```typescript
  async socialLogin(provider: 'google' | 'github' | 'facebook'): Promise<void> {
    try {
      await this.authRepo.signInWithOAuth(provider);
    } catch (err) {
      throw AppError.fromError(err);
    }
  }
```

### 3. Presentation & UI Layer
* The custom React hook **[`useAuthLogic`](file:///home/paul/react/magical-products/src/presentation/hooks/useAuthLogic.ts#L46-L55)** manages local execution and UI errors.
* The frontend component **[`Auth.tsx`](file:///home/paul/react/magical-products/src/components/Auth.tsx#L253-L277)** renders the buttons for Google, GitHub, and Facebook and binds them to the login flow:

```tsx
<button onClick={() => handleSocialLogin('google')}>
  {/* Google Brand Logo & Styles */}
  Google
</button>
```
