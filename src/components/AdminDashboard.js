import React, { useState } from "react";
import "./AdminDashboard.css";

const stats = [
  { label: "Today's Orders", value: "47", icon: "📋", change: "+12%" },
  { label: "Revenue", value: "₹18,240", icon: "💰", change: "+8%" },
  { label: "Active Tables", value: "9 / 12", icon: "🪑", change: "" },
  { label: "Pending Orders", value: "5", icon: "⏳", change: "" },
];

const recentOrders = [
  { id: "ORD001", table: "T3", items: "Dal Makhani, Butter Naan x2", total: 340, status: "preparing", time: "5 min ago" },
  { id: "ORD002", table: "T7", items: "Butter Chicken, Naan, Lassi", total: 490, status: "served", time: "12 min ago" },
  { id: "ORD003", table: "T1", items: "Paneer Tikka, Spring Roll", total: 380, status: "new", time: "2 min ago" },
  { id: "ORD004", table: "T5", items: "Masala Chai x3, Paratha x2", total: 300, status: "preparing", time: "8 min ago" },
];

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/admin" },
  { label: "Menu Manager", icon: "🍜", path: "/admin/menu" },
  { label: "All Orders", icon: "📋", path: "/admin/orders" },
  { label: "Tables & QR", icon: "🪑", path: "/admin/tables" },
  { label: "Staff", icon: "👥", path: "/admin/staff" },
];

function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span>🍽️</span>
          <span>FoodApp</span>
        </div>
        <div className="sidebar-label">Admin Panel</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActiveNav(item.label); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <a href="/login" className="logout-btn">🚪 Logout</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-sub">Welcome back, Admin 👋</p>
          </div>
          <div className="topbar-date">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.change && <div className="stat-change">{stat.change} vs yesterday</div>}
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="section-card">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <a href="/admin/orders" className="view-all">View all →</a>
          </div>
          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td><span className="table-tag">{order.table}</span></td>
                    <td className="items-cell">{order.items}</td>
                    <td className="price-cell">₹{order.total}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status === "new" ? "🔴 New" : order.status === "preparing" ? "🟡 Preparing" : "🟢 Served"}
                      </span>
                    </td>
                    <td className="time-cell">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section-card">
          <div className="section-header"><h2>Quick Actions</h2></div>
          <div className="quick-actions">
            <a href="/admin/menu" className="action-btn">➕ Add Menu Item</a>
            <a href="/admin/tables" className="action-btn">🔗 Generate QR Code</a>
            <a href="/admin/staff" className="action-btn">👤 Add Staff Member</a>
            <a href="/kitchen" className="action-btn">🧑‍🍳 Kitchen Display</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;