/**
 * Generic list renderer.
 *
 * Renders any array of items inside a responsive CSS grid.
 * The caller supplies:
 *  - `items`         – the data array
 *  - `renderItem`    – a function that turns one item + its index into a React node
 *  - `keyExtractor`  – a function that returns a unique string key per item
 *
 * @example
 * <ItemList
 *   items={productds}
 *   keyExtractor={t => t.id}
 *   renderItem={(product, i) => <ProductCard product={product} index={i} ... />}
 * />
 */

import { ReactNode } from "react";

interface ItemListProps<T> {
  /** The data to render. */
  items: T[];
  /** Return a stable unique key for each item (used as React key). */
  keyExtractor: (item: T) => string;
  /** Render one item. Receives the item and its 0-based index. */
  renderItem: (item: T, index: number) => ReactNode;
  /** CSS class applied to the wrapping <ul>. Defaults to a 3-col responsive grid. */
  gridClassName?: string;
  /** HTML id placed on the wrapping <ul>. */
  listId?: string;
}

export function ItemList<T>({
  items,
  keyExtractor,
  renderItem,
  gridClassName = "grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  listId = "item-list",
}: ItemListProps<T>) {
  return (
    <ul className={gridClassName} id={listId}>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}
