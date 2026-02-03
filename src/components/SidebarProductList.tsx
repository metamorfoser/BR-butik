import { Link } from "react-router-dom";
import type { ShopProduct } from "../types/ShopProduct";
import "./SidebarProductList.scss";

type Props = {
  title: string;
  products: ShopProduct[];
};

export function SidebarProductList({ title, products }: Props) {
  return (
    <div className="sidebar-product-list">
      <h2>{title}</h2>

      <div className="sidebar-product-grid">
        {products.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id} className="sidebar-product-card">
            <img src={p.thumbnail} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.price} kr</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
