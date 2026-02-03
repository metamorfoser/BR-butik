import { useEffect, useState, useMemo } from "react";
import { useCart } from "../context/useCart";
import { ProductSidebar } from "../components/ProductSidebar";
import { ProductsGrid } from "../components/ProductsGrid";
import type { ShopProduct } from "../types/ShopProduct";

import "./ProductsPage.scss";

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
};

export function ProductsPage() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, showPopup } = useCart();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      const mapped: ShopProduct[] = data.products.map((p: ApiProduct) => ({
        ...p,
        originalCategory: p.category,
      }));

      setProducts(mapped);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  function getUiCategory(p: ShopProduct): "face" | "body" | "spa" {
    const c = (p.originalCategory ?? p.category).toLowerCase();

    if (c.includes("skin") || c.includes("care") || c.includes("beauty")) {
      return "face";
    }

    if (c.includes("fragrance")) {
      return "spa";
    }

    return "body";
  }

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter((p) => getUiCategory(p) === category);
    }

    if (searchText.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [category, searchText, sort, products]);

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div className="products-layout">
      <ProductSidebar className="product-sidebar" />

      <div className="products-content">
        <h1 className="products-title">
          KerstinFlorian hos BEAUTYRELAX by Ida
        </h1>

        <div className="products-filter">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Alla kategorier</option>
            <option value="face">Face</option>
            <option value="body">Body</option>
            <option value="spa">Spa</option>
          </select>

          <input
            type="text"
            placeholder="Sök produkt…"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sortera</option>
            <option value="name-asc">Namn: A–Ö</option>
            <option value="price-asc">Pris: Lägst först</option>
            <option value="price-desc">Pris: Högst först</option>
          </select>
        </div>

        <ProductsGrid
          products={filteredProducts}
          onAddToCart={(p) => {
            addToCart({ ...p, quantity: 1 });
            showPopup(p.title);
          }}
        />
      </div>
    </div>
  );
}
