

Viewed useInventoryLogic.ts:85-149

Now I'll check if appConfig uses Supabase so we keep the subscription conditional:

Searched for "databaseProvider"

Now add a `useEffect` that subscribes to Supabase real-time changes on the `categories` table:

Edited useInventoryLogic.ts
Ran command: `npx tsc --noEmit 2>&1 | head -20`

Clean. Here's what was happening and what was fixed:

**Root cause:** `categories` was loaded once on app boot via `loadInventory()` and never updated again. The sidebar tree itself was already reactive (`useMemo` rebuilds the tree whenever `categories` changes), but the data never changed.

**Fix — real-time Supabase subscription** in `useInventoryLogic.ts`:
- On mount, opens a `postgres_changes` channel on the `categories` table listening for `INSERT`, `UPDATE`, and `DELETE` events.
- On any change, immediately re-fetches the full categories list from Supabase and calls `setCategories()`.
- The new `categories` state flows into `InventoryContext` → `StoreView` → `CategorySidebar` → `buildTree()`, updating the tree automatically — **no manual refresh needed**.
- The channel is properly cleaned up when the component unmounts.
- Guarded behind `appConfig.databaseProvider === 'supabase'` so it's a no-op for Appwrite setups.



