import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import "./Header.scss";
import logo from "../assets/BR_pixel_512x512_vit-80x80.png";

export function Header() {
  const { cart, getTotal } = useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotal();

  return (
    <header className="header">

      {/* Vänster logga */}
      <div className="header-logo-centered">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Mitten: meny */}
      <nav className="header-center">
        <Link to="/">Hem</Link>
        <Link to="behandlingar">Behandlingar</Link>
        <Link to="firanden">Firanden</Link>
        <Link to="infor-brollopet">Inför bröllopet</Link>
        <Link to="om-oss">Om oss</Link>
        <Link to="butik">Butik</Link>
      </nav>

      {/* Höger: shoppingbag och checkout */}
      <div className="header-right">

        {/* Shoppingbag och Varukorg */}
        <Link to="cart" className="bag-wrapper">
          <span className="bag-icon">🛍️</span>
          {totalQuantity > 0 && (
            <span className="badge">{totalQuantity}</span>
          )}
        </Link>

        {/* Summa och kundvagn till Checkout */}
        <Link to="checkout" className="checkout-wrapper">
          <span className="cart-summary">{totalPrice} kr</span>
          <span className="checkout-icon">🛒</span>
        </Link>

      </div>
    </header>
  );
}
