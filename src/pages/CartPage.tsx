import type { CartItem, ShopProduct } from "../types/ShopProduct";
import { useCart } from "../context/useCart";
import { ThreeColumnLayout } from "../components/ThreeColumnLayout";
import { SidebarProductList } from "../components/SidebarProductList";
import { useEffect, useState } from "react";
import "./CartPage.scss";
import CheckoutSteps from "../components/CheckoutSteps";

import PresentkortImg from "../assets/presentkort.png";
import KlippkortImg from "../assets/Massage1-scaled-300x300.jpg";

export function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotal, addToCart  } =
    useCart();

  const [related, setRelated] = useState<ShopProduct[]>([]);
  const [news, setNews] = useState<ShopProduct[]>([]);

  // Presentkort + klippkort i höger kolumn
const fixedGiftProducts = [
  {
    id: 90001,
    title: "Presentkort",
    price: 600,
    thumbnail: PresentkortImg,
    description: "Presentkort – fast värde",
    category: "gift",
    originalCategory: "gift"
  },
  {
    id: 90002,
    title: "Klippkort – 3 klipp (40 min)",
    price: 2400,
    thumbnail: KlippkortImg,
    description: "Klippkort med 3 klipp á 40 min",
    category: "gift",
    originalCategory: "gift"
  }
];


  // Hämta rekommenderade produkter baserat på varukorgen
  useEffect(() => {
    async function fetchRelated() {
      if (cart.length === 0) {
        setRelated([]);
        return;
      }

      const categories = Array.from(
        new Set(cart.map((item) => item.originalCategory))
      );

      const all: ShopProduct[] = [];

      for (const cat of categories) {
        const res = await fetch(
          `https://dummyjson.com/products/category/${cat}`
        );
        const data = await res.json();
        all.push(...data.products.slice(0, 3));
      }

      setRelated(all);
    }

    fetchRelated();
  }, [cart]);

  // Hämta fallback: Nyheter istället när varukorgen är tom
  useEffect(() => {
    async function fetchNews() {
      const res = await fetch("https://dummyjson.com/products?limit=3");
      const data = await res.json();
      setNews(data.products);
    }

    fetchNews();
  }, []);

  const total = getTotal();

  return (
    <ThreeColumnLayout
      left={
        cart.length > 0 ? (
          <SidebarProductList
            title="Rekommenderat för dig"
            products={related}
          />
        ) : (
          <SidebarProductList
            title="Nyheter"
            products={news}
          />
        )
      }
      center={
        <div className="cart-page">
          <div className="cart-title-row">
            <CheckoutSteps step={1} />
          </div>

          {cart.length > 0 && (
            <a href="/checkout" className="checkout-btn-top">
              Gå till kassan
            </a>
          )}

          <div className="cart-list">
            {cart.length === 0 && <p>Din varukorg är tom.</p>}

            {cart.map((item: CartItem) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />

                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p>{item.price} kr</p>
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="cart-summary-box">
              <p className="total">Totalt: {total} kr</p>
              <a href="/checkout" className="checkout-btn">
                Gå till kassan
              </a>
            </div>
          )}
        </div>
      }
right={
  <div className="gift-column">
    <h3>Ge bort egentid</h3>

    {fixedGiftProducts.map((p) => (
      <div key={p.id} className="gift-card">
        <img src={p.thumbnail} alt={p.title} />

        <div className="gift-info">
          <h4>{p.title}</h4>
          <p>{p.price} kr</p>

          <button
            className="add-gift-btn"
            onClick={() =>
              addToCart({
                ...p,
                quantity: 1
              })
            }
          >
            Lägg till
          </button>
        </div>
      </div>
    ))}
  </div>
}
    />
  );
}
