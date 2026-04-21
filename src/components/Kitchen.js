import React, { useState, useEffect } from "react";
import "./kitchen.css";

const initialOrders = [
  {
    id: "ORD001", table: "T3", time: "10:42 AM", status: "new",
    items: [
      { name: "Dal Makhani", qty: 1 },
      { name: "Butter Naan", qty: 2 },
    ]
  },
  {
    id: "ORD003", table: "T1", time: "10:51 AM", status: "new",
    items: [
      { name: "Paneer Tikka", qty: 1 },
      { name: "Veg Spring Roll", qty: 2 },
    ]
  },
  {
    id: "ORD004", table: "T5", time: "10:45 AM", status: "preparing",
    items: [
      { name: "Masala Chai", qty: 3 },
      { name: "Laccha Paratha", qty: 2 },
    ]
  },
  {
    id: "ORD002", table: "T7", time: "10:36 AM", status: "ready",
    items: [
      { name: "Butter Chicken", qty: 1 },
      { name: "Butter Naan", qty: 2 },
      { name: "Mango Lassi", qty: 1 },
    ]
  },
];

function Kitchen() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("all");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    new: orders.filter((o) => o.status === "new").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
  };

  return (
    <div className="kitchen-container">
      {/* Header */}
      <div className="kitchen-header">
        <div className="kitchen-brand">🧑‍🍳 Kitchen Display</div>
        <div className="kitchen-time">{time}</div>
        <div className="kitchen-counts">
          <span className="kc-badge kc-new">🔴 {counts.new} New</span>
          <span className="kc-badge kc-prep">🟡 {counts.preparing} Preparing</span>
          <span className="kc-badge kc-ready">🟢 {counts.ready} Ready</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="kitchen-filters">
        {["all", "new", "preparing", "ready"].map((f) => (
          <button
            key={f}
            className={`kf-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="kitchen-grid">
        {filtered.map((order) => (
          <div key={order.id} className={`kitchen-card status-${order.status}`}>
            <div className="kc-top">
              <div>
                <div className="kc-table">Table {order.table}</div>
                <div className="kc-id">{order.id}</div>
              </div>
              <div className="kc-time">{order.time}</div>
            </div>

            <div className="kc-items">
              {order.items.map((item, i) => (
                <div key={i} className="kc-item">
                  <span>{item.name}</span>
                  <span className="kc-qty">x{item.qty}</span>
                </div>
              ))}
            </div>

            <div className="kc-actions">
              {order.status === "new" && (
                <button
                  className="kca-btn kca-start"
                  onClick={() => updateStatus(order.id, "preparing")}
                >
                  Start Preparing
                </button>
              )}
              {order.status === "preparing" && (
                <button
                  className="kca-btn kca-ready"
                  onClick={() => updateStatus(order.id, "ready")}
                >
                  Mark Ready ✓
                </button>
              )}
              {order.status === "ready" && (
                <button
                  className="kca-btn kca-served"
                  onClick={() => updateStatus(order.id, "served")}
                >
                  Mark Served ✓
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kitchen;