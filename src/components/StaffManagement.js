import React, { useState } from "react";
import "./StaffManagement.css";

const initialStaff = [
  { id: 1, name: "Rahul Sharma", role: "Manager", email: "rahul@foodapp.com", phone: "9876543210", shift: "Morning", status: "active" },
  { id: 2, name: "Priya Verma", role: "Waiter", email: "priya@foodapp.com", phone: "9876543211", shift: "Morning", status: "active" },
  { id: 3, name: "Aakash Singh", role: "Chef", email: "aakash@foodapp.com", phone: "9876543212", shift: "Evening", status: "active" },
  { id: 4, name: "Neha Patel", role: "Cashier", email: "neha@foodapp.com", phone: "9876543213", shift: "Morning", status: "inactive" },
  { id: 5, name: "Ravi Kumar", role: "Waiter", email: "ravi@foodapp.com", phone: "9876543214", shift: "Evening", status: "active" },
];

const roles = ["Manager", "Chef", "Waiter", "Cashier", "Cleaner"];
const shifts = ["Morning", "Evening", "Night"];

function StaffManagement() {
  const [staff, setStaff] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", role: "Waiter", email: "", phone: "", shift: "Morning" });

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    setStaff((prev) => [...prev, { ...form, id: Date.now(), status: "active" }]);
    setForm({ name: "", role: "Waiter", email: "", phone: "", shift: "Morning" });
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setStaff((prev) =>
      prev.map((s) => s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)
    );
  };

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="staff-page">
      {/* Page Header */}
      <div className="staff-topbar">
        <div>
          <h1 className="staff-title">Staff Management</h1>
          <p className="staff-sub">{staff.filter((s) => s.status === "active").length} active members</p>
        </div>
        <button className="add-staff-btn" onClick={() => setShowModal(true)}>
          + Add Staff
        </button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Staff Cards */}
      <div className="staff-grid">
        {filtered.map((member) => (
          <div key={member.id} className={`staff-card ${member.status === "inactive" ? "inactive-card" : ""}`}>
            <div className="staff-card-top">
              <div className="staff-avatar">
                {getInitials(member.name)}
              </div>
              <div className="staff-info">
                <div className="staff-name">{member.name}</div>
                <span className={`role-badge role-${member.role.toLowerCase()}`}>{member.role}</span>
              </div>
              <div
                className={`status-dot ${member.status}`}
                title={member.status}
                onClick={() => toggleStatus(member.id)}
              />
            </div>
            <div className="staff-details">
              <div className="detail-row">📧 {member.email}</div>
              <div className="detail-row">📱 {member.phone}</div>
              <div className="detail-row">⏰ {member.shift} Shift</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Staff Member</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Rohit Mehra"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  {roles.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Shift</label>
                <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })}>
                  {shifts.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="email@foodapp.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <button className="modal-submit" onClick={handleAdd}>Add Member</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffManagement;