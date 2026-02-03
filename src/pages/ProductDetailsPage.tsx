import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import type { ShopProduct } from "../types/ShopProduct";
import { ThreeColumnLayout } from "../components/ThreeColumnLayout";
import { SidebarProductList } from "../components/SidebarProductList";



import "./ProductDetailsPage.scss";

// Typ för API-produkter
type ApiProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
};

export function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, showPopup } = useCart();

  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [related, setRelated] = useState<ShopProduct[]>([]);

  //  Hämta produkt
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data: ApiProduct = await res.json();

      const mapped: ShopProduct = {
        ...data,
        originalCategory: data.category,
        category:
          data.category.includes("skin")
            ? "face"
            : data.category.includes("fragrance")
            ? "spa"
            : "body",
      };

      setProduct(mapped);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  //  Hämta liknande produkter
  useEffect(() => {
    if (!product) return;

    async function fetchRelated() {
      const res = await fetch(
        `https://dummyjson.com/products/category/${product!.originalCategory}`
      );
      const data = await res.json();

      const mappedRelated: ShopProduct[] = (data.products || [])
        .filter((p: ApiProduct) => p.id !== product!.id)
        .slice(0, 3)
        .map((p: ApiProduct) => ({
          ...p,
          originalCategory: p.category,
          category:
            p.category.includes("skin")
              ? "face"
              : p.category.includes("fragrance")
              ? "spa"
              : "body",
        }));

      setRelated(mappedRelated);
    }

    fetchRelated();
  }, [product]);

  if (loading) return <p>Laddar produkt...</p>;
  if (!product) return <p>Produkten hittades inte.</p>;

return (
  <ThreeColumnLayout
    left={
      <SidebarProductList
        title="Liknande produkter"
        products={related}
      />
    }
    center={
      <div className="product-details-main">
        <Link to="/" className="back-btn">← Tillbaka</Link>

        <div className="product-details-container">
          <img src={product.thumbnail} alt={product.title} className="product-image" />

          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="price">{product.price} kr</p>
            <p className="description">{product.description}</p>

            <div className="quantity-row">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => {
                addToCart({ ...product, quantity });
                showPopup(product.title);
              }}
            >
              Lägg i varukorg
            </button>
          </div>
        </div>
      </div>
    }
    right={
      <SidebarProductList
        title="Ta hand om din hud under vinterns kalla månader"
        products={related.slice(0, 1)}
      />
    }
  />
);
}
