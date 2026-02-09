import { useCart } from "../context/useCart";
import { ThreeColumnLayout } from "../components/ThreeColumnLayout";
import CheckoutSteps from "../components/CheckoutSteps";
import { useEffect, useState } from "react";
import "./OrderConfirmationPage.scss";
import { Link } from "react-router-dom";

const GENERATED_ORDER_NUMBER = Math.floor(Math.random() * 900000 + 100000);

export function OrderConfirmationPage() {
  const { getTotal, clearCart } = useCart();

  const [finalTotal, setFinalTotal] = useState<number>(0);

  useEffect(() => {
    queueMicrotask(() => {
      const totalBeforeClear = getTotal();
      setFinalTotal(totalBeforeClear);
    });
  }, [getTotal]);

  return (
    <ThreeColumnLayout
      left={<div></div>}
      center={
        <div className="confirmation-page">
          <div className="confirmation-steps">
            <CheckoutSteps step={3} />
          </div>

          <div className="confirmation-background">
            <div className="confirmation-card">

              <h1 className="confirmation-title">Tack för din order!</h1>

              <div className="order-box">
                <h3>Orderinformation</h3>

                <div className="order-row">
                  <span>Ordernummer:</span>
                  <span># {GENERATED_ORDER_NUMBER}</span>
                </div>

                <div className="order-row">
                  <span>Totalt belopp:</span>
                  <span>{finalTotal} kr</span>
                </div>
              </div>

              <Link to="/" className="continue-btn" onClick={clearCart}>
                Fortsätt handla
              </Link>
            </div>
          </div>
        </div>
      }
      right={<div></div>}
    />
  );
}
