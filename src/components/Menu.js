import { useState } from "react";
import "./menu.css";

/* ── DATA ── */
const menuItems = [
  {
    id: 1,
    name: "Roasted Chicken",
    desc: "Fresh grilled drumsticks with crisp lettuce, cherry tomatoes & herbs",
    price: 12.0,
    rating: 4.5,
    cal: "100 Kcal",
    time: "5-10 Min",
    tag: "Hot sale",
    emoji: "🍗",
    bg: "#ff6b35",
  },
  {
    id: 2,
    name: "Grilled Chicken",
    desc: "Smoky grilled breast with garlic butter sauce and seasoned fries",
    price: 11.0,
    rating: 4.5,
    cal: "130 Kcal",
    time: "20 Min",
    tag: "Popular",
    emoji: "🥩",
    bg: "#e65c00",
  },
  {
    id: 3,
    name: "Crispy Chicken",
    desc: "Golden fried chicken with coleslaw and house dipping sauce",
    price: 12.0,
    rating: 4.3,
    cal: "180 Kcal",
    time: "15 Min",
    tag: "New",
    emoji: "🍖",
    bg: "#ff8c42",
  },
  {
    id: 4,
    name: "Caesar Salad",
    desc: "Romaine lettuce, croutons, parmesan with classic Caesar dressing",
    price: 8.5,
    rating: 4.2,
    cal: "80 Kcal",
    time: "5 Min",
    tag: "Salads",
    emoji: "🥗",
    bg: "#4caf50",
  },

  {
    id: 4,
    name: "Caesar Salad",
    desc: "Romaine lettuce, croutons, parmesan with classic Caesar dressing",
    price: 8.5,
    rating: 4.2,
    cal: "80 Kcal",
    time: "5 Min",
    tag: "Salads",
    emoji: "🥗",
    bg: "#4caf50",
  },
];

const categories = ["All", "Salads", "Hot sale", "Popular", "New"];

const DELIVERY_FEE = 3.5;

/* ── COMPONENT ── */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);

  /* ── CART LOGIC ── */
  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: { ...item, qty: (prev[item.id]?.qty || 0) + 1 },
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id]?.qty > 1) updated[id].qty -= 1;
      else delete updated[id];
      return updated;
    });
  };

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);
  const subtotal = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const delivery = cartItems.length > 0 ? DELIVERY_FEE : 0;

  /* ── FILTER ── */
  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "All" || item.tag === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="menu-root">
      {/* BACKGROUND BLOBS */}
      <div className="blob1" />
      <div className="blob2" />

      <div className="menu-container">

        {/* ── HEADER ── */}
        <div className="menu-header">
          <div>
            <div className="location-row">
              <span>📍</span>
              <span className="location-label">Habiganj City</span>
            </div>
            <div className="title-row">
              <span className="find-text">Find The </span>
              <span className="best-text">Best</span>
            </div>
            <div className="food-tagline">Food Around You</div>
          </div>

          <button className="cart-btn" onClick={() => setShowCart(true)}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* ── SEARCH ── */}
        <div className="search-box">
   
          <input
            className="search-input"
            placeholder="Search your favourite food"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
                 <span className="search-icon">🔍</span>
         
        </div>

        {/* ── CATEGORIES ── */}
        <div className="cat-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── SECTION HEADING ── */}
        <div className="section-row">
          <span className="section-title">Recommended For You</span>
          <span className="see-all">See All</span>
        </div>

        {/* ── FOOD GRID ── */}
        <div className="food-grid">
          {filtered.map((item) => (
            <div key={item.id} className="food-card">

              {/* Image Area */}
              <div
                className="card-img"
                style={{
                  background: `radial-gradient(circle at 60% 40%, ${item.bg}cc, ${item.bg}55)`,
                }}
              >
                <span className="food-emoji">{item.emoji}</span>
                <span className="tag-badge">{item.tag}</span>
                <button className="heart-btn" title="Favourite">🤍</button>
              </div>

              {/* Info */}
              <div className="card-body">
                <div className="card-top">
                  <span className="food-name">{item.name}</span>
                  <span className="food-price">${item.price.toFixed(2)}</span>
                </div>
                <p className="food-desc">{item.desc}</p>
                <div className="meta-row">
                  <span className="meta-item">⭐ {item.rating}</span>
                  <span className="meta-dot">•</span>
                  <span className="meta-item">🔥 {item.cal}</span>
                  <span className="meta-dot">•</span>
                  <span className="meta-item">⏱ {item.time}</span>
                </div>

                {/* Add / Qty */}
                {cart[item.id] ? (
                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                    <span className="qty-num">{cart[item.id].qty}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => addToCart(item)}>
                    + Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">😕 No items found. Try a different search!</div>
        )}

        <div className="spacer" />
      </div>

      {/* ── BOTTOM NAV ── 
      <div className="bottom-nav">
        <span className="nav-icon">🏠</span>
        <span className="nav-icon" onClick={() => setShowCart(true)}>
          🛒
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </span>
        <span className="nav-icon">❤️</span>
        <span className="nav-icon">👤</span>
      </div>
      

      {/* ── CART MODAL ── */}
      {showCart && (
        <div className="overlay" onClick={() => setShowCart(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>

            <div className="cart-header">
              <span className="cart-title">Your Cart</span>
              <button className="close-btn" onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">🛒 Cart is empty. Add some items!</div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span className="cart-emoji">{item.emoji}</span>
                    <div className="cart-info">
                      <span className="cart-name">{item.name}</span>
                      <span className="cart-item-price">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                    <div className="cart-qty">
                      <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                ))}

                {/* Promo */}
                <div className="promo-row">
                  <input className="promo-input" placeholder="Promo Code" />
                  <button className="promo-apply">Apply</button>
                </div>

                {/* Totals */}
                <div className="totals">
                  <div className="total-row">
                    <span className="total-label">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span className="total-label">Delivery</span>
                    <span>${delivery.toFixed(2)}</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total</span>
                    <span>${(subtotal + delivery).toFixed(2)}</span>
                  </div>
                </div>

                <button className="checkout-btn">Place Order</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}