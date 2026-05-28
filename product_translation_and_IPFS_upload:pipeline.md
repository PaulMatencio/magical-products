
### Step 1: Database Schema Expansion
The current `product_translations` table stores only the translated text (`name`, `description`). To associate each language translation with a distinct, language-specific JSON metadata file in IPFS, we must add a `metadata_url` column to it.

```sql
ALTER TABLE public.product_translations ADD COLUMN IF NOT EXISTS metadata_url TEXT;
```

---

### Step 2: The Translation & IPFS Upload Pipeline
When a product is translated (either automatically during admin addition/bulk upload or through an on-demand translation tool for existing products), the pipeline operates as follows:

1. **Fetch Original Data:** Retrieve the primary product record and its original metadata from the current `metadata_url` (stored in IPFS).
2. **Translate Content:** Call the Gemini translation API (`GeminiAnalyzerService`) to translate the user-facing text fields to the target language (e.g., Spanish, French, or Italian):
   * `name`
   * `description`
   * `attributes` (like `color`, `material`)
   * `nutritional_info` (like `ingredients`, `allergens`, `certifications`, `main_ingredients`)
3. **Keep Original Assets:** Maintain the original `image_url` (and `image_cid`) from the master product record.
4. **Compile Localized Metadata JSON:** Construct a new `ConsolidatedMetadata` JSON payload containing the translated text attributes while keeping the original image reference.
5. **Upload to IPFS:** Convert this localized JSON metadata to a blob and upload it to IPFS via `ipfsService.uploadFile`. This returns a **new IPFS CID** representing the translated metadata file.
6. **Save to Database:** Write (or upsert) the translation entry to the `product_translations` table:
   * `product_id`: The ID of the parent product.
   * `language_id`: The ID of the target language.
   * `name`: The translated name.
   * `description`: The translated description.
   * `metadata_url`: The gateway URL pointing to the **new** translated IPFS JSON metadata file.

---

### Step 3: Storefront View Logic (`StoreView.tsx`)
When a user switches the active language on the store view:

1. **Load Localizations:** The application queries the `product_translations` and `category_translations` tables for the selected language.
2. **Translate Categories/Subcategories:** The category tree elements are mapped to their translated names, ensuring the navigation tree matches the chosen language.
3. **Map Localized Products:** The storefront products are dynamically mapped in `StoreView.tsx`:
   * If a matching translation row exists for the selected language:
     * Overwrite `name` and `title` with `translation.name`.
     * Overwrite `description` with `translation.description`.
     * Overwrite `digital_passport_url` / `metadata_url` with `translation.metadata_url` (the translated IPFS URL).
     * **Keep the master product's original `image_url`**.
   * If no translation row is found, fall back to the default English product details.
4. **Filtering Consistency:** Because categories and subcategories use unique `UUID` identifiers that do not change across translations, filtering by category/subcategory continues to work identically, but all display names and product details update to the selected language.

---

### Step 4: Verification
Confirm that selecting a subcategory correctly displays the translated products, and clicking on a translated product details page retrieves the localized IPFS metadata URL.






I will view the contents of `useAdminLogic.ts` to locate where we can integrate product translation capabilities.

Viewed useAdminLogic.ts:1-159

I will view lines 330 to 355 of `StoreView.tsx` to verify the exact range for `translatedProducts`.

Viewed StoreView.tsx:330-355

I will update the `translatedProducts` mapping in `StoreView.tsx` to override the `digital_passport_url` and `metadata_url` with the translated IPFS link.

Edited StoreView.tsx

I will search for `IAdminRepository` in the codebase to see where the admin interface repository is declared.

Searched for "IAdminRepository"

I will view `IAdminRepository.ts` to examine its defined functions.

Viewed IAdminRepository.ts:1-41

I will view `AdminUseCase.ts` to see how product addition and updates are orchestrated in the application domain layer.

Viewed AdminUseCase.ts:1-35

I will search for `addNewProduct` references across the codebase to see where it is triggered.

Searched for "addNewProduct"

I will search for `Bulkload` in the codebase to see how bulk uploads are handled.

Searched for "Bulkload"

I will view `BulkloadUseCase.ts` to see how bulk uploads translate files and create product records.

Viewed BulkloadUseCase.ts:1-93

I will search for the components or layout of `InventoryManager.tsx` to see where the product listings are and where we could integrate translation triggers.

Searched for "InventoryManager"

I will view the first 100 lines of `InventoryManager.tsx` to understand the product data and hooks it consumes.

Viewed InventoryManager.tsx:1-436

I will search for `nutritional_info` in `types.ts` to see its type definition and where it is nested inside the product structures.

Searched for "nutritional_info"

I will view lines 270 to 330 of `types.ts` to see where `nutritional_info` is nested.

Viewed types.ts:270-330

I will search for `ConsolidatedMetadata` to check all the properties it contains.

Searched for "ConsolidatedMetadata"

I will view lines 190 to 225 of `types.ts` to examine the `ConsolidatedMetadata` interface.

Viewed types.ts:190-225

I will search for `nutritional_info` references in form components and hooks to see where it is entered and saved.

Searched for "nutritional_info"

I will view lines 215 to 245 of `types.ts` to inspect the `Attributes` interface properties.

Viewed types.ts:215-245

I will view lines 240 to 270 of `types.ts` to see the rest of the `NutritionalInfo` interface definition.

Viewed types.ts:240-270

I will search for `digital_passport_url` in the React components to see how the frontend loads and displays the IPFS metadata.

Searched for "digital_passport_url"

I will view lines 80 to 140 of `ProductDetails.tsx` to see how it loads and processes the IPFS metadata document.

Viewed ProductDetails.tsx:80-140

I will view lines 200 to 215 in `types.ts` to locate the exact declaration of `PartialMetadata`.

Viewed types.ts:200-215

I will edit `PartialMetadata` in `types.ts` to include the optional `nutritional_info` field.

Edited types.ts

I will view the first 15 lines of `GeminiAnalyzerService.ts` to see the current imports.

Viewed GeminiAnalyzerService.ts:1-15

I will update the imports in `GeminiAnalyzerService.ts` to include `ConsolidatedMetadata`.

Edited GeminiAnalyzerService.ts

I will view the end of `GeminiAnalyzerService.ts` to locate the exact place to insert the `translateConsolidatedMetadata` method.

Viewed GeminiAnalyzerService.ts:170-221

I will add the `translateConsolidatedMetadata` method to the `GeminiAnalyzerService` class.

Edited GeminiAnalyzerService.ts

I will view lines 75 to 110 of `SupabaseAdminRepository.ts` to locate the exact place to modify `addProduct`.

Viewed SupabaseAdminRepository.ts:75-110

I will view the imports at the top of `SupabaseAdminRepository.ts`.

Viewed SupabaseAdminRepository.ts:1-15

I will import `GeminiAnalyzerService` in `SupabaseAdminRepository.ts`.

Edited SupabaseAdminRepository.ts

I will view lines 105 to 140 of `SupabaseAdminRepository.ts`.

Viewed SupabaseAdminRepository.ts:105-140

I will update `addProduct` to trigger the automatic translation pipeline in the background after a product is successfully saved to the database.

Edited SupabaseAdminRepository.ts

I will view lines 155 to 195 of `SupabaseAdminRepository.ts` to locate the `updateProduct` save return statement.

Viewed SupabaseAdminRepository.ts:155-195

I will update `updateProduct` to trigger the automatic translation pipeline in the background when relevant product fields are updated.

Edited SupabaseAdminRepository.ts

I will view the end of `SupabaseAdminRepository.ts` to locate where the class closes so we can safely insert the helper method.

Viewed SupabaseAdminRepository.ts:270-316

I will add the `translateProductAllLanguages` helper method to the `SupabaseAdminRepository` class. This method fetches the original product metadata, translates it to all active languages (except default/English) via the Gemini API, uploads the new translated JSON files to IPFS, and updates the `product_translations` table in Supabase.

Edited SupabaseAdminRepository.ts

I will run a compilation check to ensure there are no syntax or type issues after these modifications.

Ran command: `npm run lint`

I will view lines 300 to 325 of `SupabaseAdminRepository.ts` to examine the syntax structure around line 312.

Viewed SupabaseAdminRepository.ts:300-325

I will fix the missing closing brace in `fetchDashboardStats` that caused the syntax error.

Edited SupabaseAdminRepository.ts

I will run the compilation check again.

Ran command: `npm run lint`

I will view lines 200 to 220 of `types.ts` to locate the exact place to add the `description` field to `PartialMetadata` and `ConsolidatedMetadata`.

Viewed types.ts:200-220

I will edit `types.ts` to add the optional `description` field to both the `PartialMetadata` and `ConsolidatedMetadata` interfaces.

Edited types.ts

I will view lines 190 to 230 of `GeminiAnalyzerService.ts` to locate the `responseSchema` properties.

Viewed GeminiAnalyzerService.ts:190-230

I will add `description` properties to the Gemini response schema in `GeminiAnalyzerService.ts`.

Edited GeminiAnalyzerService.ts

I will run a compilation check to verify that all type issues are resolved.

Ran command: `npm run lint`

I will view lines 30 to 41 of `IAdminRepository.ts` to locate the product mutation methods.

Viewed IAdminRepository.ts:30-41

I will add the `translateProduct` signature to the `IAdminRepository` interface.

Edited IAdminRepository.ts

I will view the end of `SupabaseAdminRepository.ts` to locate where we can append the `translateProduct` implementation.

Viewed SupabaseAdminRepository.ts:375-401

I will implement the `translateProduct` method in `SupabaseAdminRepository.ts`. This method retrieves the product's IPFS metadata and image CID from the database, then triggers the translation process.

Edited SupabaseAdminRepository.ts

I will view lines 390 to 420 of `SupabaseAdminRepository.ts` to check the closing braces.

Viewed SupabaseAdminRepository.ts:390-420

I will restore the closing brace of `translateProductAllLanguages`.

Edited SupabaseAdminRepository.ts

I will view the end of `AdminUseCase.ts` to locate the exact place to add `translateProduct`.

Viewed AdminUseCase.ts:25-35

I will add the `translateProduct` method to the `AdminUseCase` class.

Edited AdminUseCase.ts

I will view lines 110 to 159 of `useAdminLogic.ts` to locate the hook functions.

Viewed useAdminLogic.ts:110-159

I will add the `translateProduct` callback to the `useAdminLogic` hook. This exposes the functionality to components consuming the admin hook.

Edited useAdminLogic.ts

I will search for `AdminContext` to locate the context file and ensure it exports the new `translateProduct` method.

Searched for "removeProduct"

I will search for `AdminContext` references to locate where the admin context is declared.

Searched for "AdminContext"

I will view lines 365 to 395 of `InventoryManager.tsx` to find the exact place to add our new translate action button.

Viewed InventoryManager.tsx:365-395

I will view lines 5 to 15 of `InventoryManager.tsx` to double check the import statement before editing.

Viewed InventoryManager.tsx:5-15

I will import the `Globe` icon in `InventoryManager.tsx`.

Edited InventoryManager.tsx

I will view lines 45 to 55 of `InventoryManager.tsx` to prepare for editing the `useAdmin` destructuring.

Viewed InventoryManager.tsx:45-55

I will destructure the `translateProduct` method from the `useAdmin()` hook in `InventoryManager.tsx`.

Edited InventoryManager.tsx

I will view lines 95 to 115 of `InventoryManager.tsx`.

Viewed InventoryManager.tsx:95-115

I will add the `handleTranslateProduct` function that will display a toast loader during translation and reload the inventory on success.

Edited InventoryManager.tsx

I will view lines 375 to 405 of `InventoryManager.tsx` to locate the action buttons inside the table structure.

Viewed InventoryManager.tsx:375-405

I will add the "Translate to All Languages" button to the product actions in the inventory table. This button is styled with an indigo/globe accent and matches the existing icon buttons.

Edited InventoryManager.tsx

I will view lines 388 to 393 of `InventoryManager.tsx` to get the exact whitespace of those lines.

Viewed InventoryManager.tsx:388-393

I will add the "Translate to All Languages" action button by replacing lines 390 to 391 in `InventoryManager.tsx`.

Edited InventoryManager.tsx

I will run the compilation check to confirm there are no errors in our UI or logic additions.

Ran command: `npm run lint`

I will view the contents of `AppwriteAdminRepository.ts` to implement a stub or the translation method there as well.

Viewed AppwriteAdminRepository.ts:1-228

I will add a no-op implementation of `translateProduct` to `AppwriteAdminRepository.ts` to satisfy the repository interface.

Edited AppwriteAdminRepository.ts

I will run the compilation check again.

Ran command: `npm run lint`

I will create a walkthrough artifact outlining the implementation details, code changes, and verification steps.

Edited walkthrough.md

I have implemented the product translation and IPFS upload pipeline. A detailed overview of the updates has been written to the walkthrough artifact:

* **[walkthrough.md](file:///home/paul/.gemini/antigravity/brain/a722a807-de24-4d68-add4-c8f8d380661f/walkthrough.md)**

### Key Highlights of the Implementation:
1. **Database Schema Integration:** Expanded interfaces to support the newly added `metadata_url` field in the translation records.
2. **Metadata Overrides:** Updated the storefront view mapping in `StoreView.tsx` so that switching language dynamically serves translation-specific IPFS URLs for both `metadata_url` and `digital_passport_url`, while maintaining the original image reference.
3. **Automated Translation Trigger:** Integrated automatic background translations during product creations (`addProduct`) and updates (`updateProduct`) in `SupabaseAdminRepository.ts`.
4. **On-Demand Translate Action:** Added a manual **Translate to All Languages** (Globe) action button directly in the inventory table row in `InventoryManager.tsx` with toast state handling.
5. **Types & Compilation:** Updated signatures in the core interfaces and added stubs to `AppwriteAdminRepository.ts` to ensure compatibility and full compilation across both repositories.

The codebase now compiles successfully. You can test the translation pipeline by adding a product or clicking the Globe button next to any item in the Inventory panel.