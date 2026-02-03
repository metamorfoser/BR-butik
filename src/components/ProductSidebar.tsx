import { useState } from "react";
import { useCart } from "../context/useCart";
import "./ProductSidebar.scss";

import klippkortImg from "../assets/Massage1-scaled-300x300.jpg";
import presentkortImg from "../assets/presentkort.png";

export function ProductSidebar({ className = "" }) {
  const { addToCart, showPopup } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  // Presentkort
  const [presentAmount, setPresentAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleAddPresent = () => {
    const amount = presentAmount === "custom" ? customAmount : presentAmount;
    if (!amount) return;

    addToCart({
      id: 9991,
      title: "Presentkort",
      price: Number(amount),
      thumbnail: presentkortImg,
      quantity: 1,
      category: "presentkort",
      originalCategory: "presentkort",
    });

    showPopup("Presentkort");
  };

  // Klippkort
  const [treatment, setTreatment] = useState("");
  const [time, setTime] = useState("");
  const [clips, setClips] = useState("");

  const clipPrices: Record<string, Record<string, number>> = {
    "3": { "25 min": 1590, "40 min": 2400, "50 min": 2820, "80 min": 4290 },
    "5": { "25 min": 2650, "40 min": 4000, "50 min": 4700, "80 min": 7150 },
    "7": { "25 min": 3710, "40 min": 5600, "50 min": 6580, "80 min": 10010 },
  };

  const handleAddClip = () => {
    if (!treatment || !time || !clips) return;

    const total = clipPrices[clips][time];

    addToCart({
      id: 9992,
      title: `Klippkort – ${treatment} ${time} (${clips} klipp)`,
      price: total,
      thumbnail: klippkortImg,
      quantity: 1,
      category: "klippkort",
      originalCategory: "klippkort",
    });

    showPopup("Klippkort");
  };

  return (
    <>
      {/* MOBILKNAPP */}
      <button className="sidebar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        Meny
      </button>

      <aside className={`product-sidebar ${className} ${menuOpen ? "open" : ""}`}>
        
        <p className="sidebar-text top-text">
          Här finner du alla produkter från KerstinFlorian som vi använder i våra behandlingar.
          Present- och klippkort.
        </p>

        {/* KLIPPKORT */}
        <div className="sidebar-section">
          <div className="sidebar-image-block">
            <img src={klippkortImg} alt="Klippkort" />
            <span className="image-title">Klippkort</span>
          </div>

          <div className="sidebar-row">
            <select
              className="sidebar-select"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            >
              <option value="">Behandlingar</option>
              <option>Hudvård</option>
              <option>Massage</option>
              <option>Sockring</option>
              <option>Koppning</option>
              <option>Rosenmetoden</option>
            </select>

            <select
              className="sidebar-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Tid</option>
              <option>25 min</option>
              <option>40 min</option>
              <option>50 min</option>
              <option>80 min</option>
            </select>
          </div>

          <div className="sidebar-row">
            <select
              className="sidebar-select"
              value={clips}
              onChange={(e) => setClips(e.target.value)}
            >
              <option value="">Antal klipp</option>
              <option>3</option>
              <option>5</option>
              <option>7</option>
            </select>

            <button className="buy-btn" onClick={handleAddClip}>
              Lägg till
            </button>
          </div>
        </div>

        {/* PRESENTKORT */}
        <div className="sidebar-section">
          <div className="sidebar-image-block">
            <img src={presentkortImg} alt="Presentkort" />
            <span className="image-title">Presentkort</span>
          </div>

          <div className="sidebar-row">
            <select
              className="sidebar-select"
              value={presentAmount}
              onChange={(e) => setPresentAmount(e.target.value)}
            >
              <option value="">Välj belopp</option>
              <option value="300">300 kr</option>
              <option value="500">500 kr</option>
              <option value="1000">1000 kr</option>
              <option value="custom">Valfritt belopp</option>
            </select>

            <button className="buy-btn" onClick={handleAddPresent}>
              Lägg till
            </button>
          </div>

          <input
            type="number"
            className={`sidebar-input ${presentAmount === "custom" ? "visible" : "hidden"}`}
            placeholder="Valfritt belopp"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            disabled={presentAmount !== "custom"}
          />
        </div>

      </aside>
    </>
  );
}
