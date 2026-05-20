/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ProductList – composes the generic ItemList<Product> with the ProductCard presenter.
 *
 * Responsibilities of this component:
 *  - Track which Product just triggered the "added" animation (addedId state)
 *  - Delegate list rendering to ItemList<Product>
 *  - Delegate card rendering to ProductCard
 */

import { useState } from "react";
import { Product } from "../../../types/types";
import appConfig from "../../../config/appConfig";
import { ItemList } from "../../../components/ItemList";

import { ProductCard } from "./ProductCard";
import { useCart } from "../../../context/CartContext";

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function ProductList({ products, onProductClick }: ProductListProps) {
  const { addToCart: onAddToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), appConfig.addToCartFlashMs);
  };

  return (
    <ItemList<Product>
      items={products}
      keyExtractor={(product) => product.id}
      listId="product-list"
      renderItem={(product, index) => (
        <ProductCard
          product={product}
          index={index}
          isAdded={addedId === product.id}
          onAdd={handleAdd}
          onProductClick={onProductClick}
        />
      )}
    />
  );
}
