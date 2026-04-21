import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./components/Login";

// Customer Flow
import Menu from "./components/Menu";
import Cart from "./components/Cart";

// Admin Pages
import AdminDashboard from "./components/AdminDashboard";
import StaffManagement from "./components/StaffManagement";

// Kitchen
import Kitchen from "./components/Kitchen";

// Simple protected route wrapper
function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("foodapp_user") || "null");
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute role="admin">
              <StaffManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kitchen"
          element={
            <ProtectedRoute>
              <Kitchen />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;