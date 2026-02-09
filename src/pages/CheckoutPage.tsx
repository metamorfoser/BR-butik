import { useCart } from "../context/useCart";
import { ThreeColumnLayout } from "../components/ThreeColumnLayout";
import { SidebarProductList } from "../components/SidebarProductList";
import { useEffect, useState } from "react";
import type { ShopProduct } from "../types/ShopProduct";
import "./CheckoutPage.scss";
import Hotstone from "../assets/Hotstone.png";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";

export function CheckoutPage() {
  const { cart, getTotal } = useCart();
  const total = getTotal();

  const [related, setRelated] = useState<ShopProduct[]>([]);

  // Hämta månadens produkt
  useEffect(() => {
    async function fetchRelated() {
      const res = await fetch("https://dummyjson.com/products/category/skincare");
      const data = await res.json();
      setRelated(data.products.slice(0, 1));
    }
    fetchRelated();
  }, []);

  return (
    <ThreeColumnLayout
      left={
        <div className="checkout-left">
          <h2 className="order-title">Orderöversikt</h2>

          <div className="order-summary">
            {cart.map((item) => (
              <div key={item.id} className="summary-row">
                <span>
                  {item.title} ({item.quantity} st)
                </span>
                <span>{item.price * item.quantity} kr</span>
              </div>
            ))}

            <div className="summary-row total-row">
              <strong>Totalt</strong>
              <strong>{total} kr</strong>
            </div>
          </div>
        </div>
      }
      center={
        <div className="checkout-page">
          <CheckoutSteps step={2} />

          <form className="checkout-form">
            <label>
              Förnamn
              <input type="text" required />
            </label>

            <label>
              Efternamn
              <input type="text" required />
            </label>

            <label>
              E‑postadress
              <input type="email" required />
            </label>

            <label>
              Adress
              <input type="text" required />
            </label>

            <label>
              Postnummer
              <input type="text" required />
            </label>

            <label>
              Stad
              <input type="text" required />
            </label>
          </form>

          {/* Betalningsmetoder */}
          <div className="payment-methods">
            <h3>Betalningsmetod</h3>

            <label className="payment-option">
              <input type="radio" name="payment" defaultChecked />
              Swish
            </label>

            <label className="payment-option">
              <input type="radio" name="payment" />
              Kort (Visa / Mastercard)
            </label>

            <label className="payment-option">
              <input type="radio" name="payment" />
              Klarna
            </label>
          </div>

          <Link to="/order-confirmation" className="place-order-btn">
            Slutför köp
          </Link>
        </div>
      }
      right={
  <div className="monthly-column">
    <h2 className="monthly-title">Vi hjälper dig förstärka din yttre skönhet och ditt inre välmående</h2>

    <img src={Hotstone} alt="Hotstone" className="monthly-image" />

    <SidebarProductList
      title=""
      products={related}
    />
  </div>
}
    />
  );
}
