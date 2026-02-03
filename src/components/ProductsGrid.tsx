import { useState } from "react";
import { Link } from "react-router-dom";
import type { ShopProduct } from "../types/ShopProduct";

type Props = {
  products: ShopProduct[];
  onAddToCart: (product: ShopProduct & { quantity: number }) => void;
};

export function ProductsGrid({ products, onAddToCart }: Props) {
  return (
    <div className="products-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: ShopProduct;
  onAddToCart: (product: ShopProduct & { quantity: number }) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-click-area">
        <div className="product-image-wrapper">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <h3>{product.title}</h3>
        <p>{product.price} kr</p>
      </Link>

      <div className="product-actions">
        <div className="quantity-selector">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => Math.max(1, q - 1));
            }}
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => q + 1);
            }}
          >
            +
          </button>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart({ ...product, quantity });
          }}
        >
          Lägg i varukorg
        </button>
      </div>
    </div>
  );
}
