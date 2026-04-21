import React, { useState } from "react";
import "./cart.css";

// Normally aayega Menu page se via state/localStorage
const mockCartItems = [
  { id: 1, name: "Paneer Tikka", price: 220, qty: 1, emoji: "🧀" },
  { id: 5, name: "Butter Chicken", price: 320, qty: 2, emoji: "🍛" },
  { id: 7, name: "Butter Naan", price: 50, qty: 3, emoji: "🫓" },
];

function Cart() {
  const [cart, setCart] = useState(mockCartItems);
  const [note, setNote] = useState("");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const tableId = new URLSearchParams(window.location.search).get("table") || "T1";

  const update = (id, delta) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + delta } : item
      ).filter((item) => item.qty > 0);
      return updated;
    });
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const placeOrder = () => {
    if (cart.length === 0) return;
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
    }, 1500);
  };

  if (placed) {
    return (
      <div className="order-success">
        <div className="success-icon">🎉</div>
        <h2>Order Placed!</h2>
        <p>Your order for <strong>Table {tableId}</strong> is being prepared.</p>
        <div className="order-id-box">Order ID: <strong>ORD{Math.floor(Math.random() * 900 + 100)}</strong></div>
        <button className="back-menu-btn" onClick={() => window.location.href = `/menu?table=${tableId}`}>
          ← Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => window.history.back()}>←</button>
        <div>
          <div className="cart-title">Your Cart</div>
          <div className="cart-table">Table {tableId}</div>
        </div>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <button className="back-menu-btn" onClick={() => window.location.href = `/menu?table=${tableId}`}>
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-emoji">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price} × {item.qty}</div>
                </div>
                <div className="cart-item-right">
                  <div className="qty-control-cart">
                    <button onClick={() => update(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => update(item.id, +1)}>+</button>
                  </div>
                  <div className="item-total">₹{item.price * item.qty}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="note-section">
            <label>Special Instructions</label>
            <textarea
              placeholder="Any allergy info, spice level, etc..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
          </div>

          {/* Bill Summary */}
          <div className="bill-summary">
            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="bill-row">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="bill-row total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Place Order */}
          <button
            className={`place-order-btn ${placing ? "loading" : ""}`}
            onClick={placeOrder}
            disabled={placing}
          >
            {placing ? "Placing Order..." : `Place Order · ₹${total}`}
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;