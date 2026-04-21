import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // Login state
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Register state
  const [registerData, setRegisterData] = useState({
    username: "", email: "", password: "", confirmPassword: ""
  });
  const [registerError, setRegisterError] = useState("");

  // LOGIN handler
  const handleLogin = () => {
    const { username, password } = loginData;

    if (!username || !password) {
      setLoginError("Username aur password dono bharo.");
      return;
    }
    if (password.length < 6) {
      setLoginError("Password kam se kam 6 characters ka hona chahiye.");
      return;
    }

    setLoginError("");

    // Hardcoded demo users — baad mein API se replace karna
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("foodapp_user", JSON.stringify({ username, role: "admin" }));
      navigate("/admin");
    } else if (username === "staff" && password === "staff123") {
      localStorage.setItem("foodapp_user", JSON.stringify({ username, role: "staff" }));
      navigate("/kitchen");
    } else {
      setLoginError("Username ya password galat hai.");
    }
  };

  // REGISTER handler
  const handleRegister = () => {
    const { username, email, password, confirmPassword } = registerData;

    if (!username || !email || !password || !confirmPassword) {
      setRegisterError("Sabhi fields bharna zaroori hai.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRegisterError("Valid email address daalo.");
      return;
    }
    if (password.length < 6) {
      setRegisterError("Password kam se kam 6 characters ka hona chahiye.");
      return;
    }
    if (password !== confirmPassword) {
      setRegisterError("Password aur Confirm Password match nahi kar rahe.");
      return;
    }

    setRegisterError("");
    alert(`Account ban gaya! Ab login karo, ${username}.`);
    setIsRegister(false);
  };

  return (
    <div className="container">

      <div className="left">
        <div className="icon">🍽️</div>
        <h1>{isRegister ? "Create Account" : "Welcome Back"}</h1>
        <p>Manage your restaurant, items, and orders with ease.</p>
        <div className="footer-left">© FoodApp</div>
      </div>

      <div className="card">
      <div className="card-inner">  
        <div className="card-top">
          <div className="lock-icon">{isRegister ? "👤" : "🔒"}</div>
          <h2>{isRegister ? "Create Account" : "Login"}</h2>
        </div>
        </div> 

        {/* LOGIN */}
        {!isRegister && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="e.g. admin"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {/* Error message */}
            {loginError && <div className="error-msg">⚠️ {loginError}</div>}

            <button className="login-btn" onClick={handleLogin}>Login</button>

            {/* Demo hint */}
            <div className="demo-hint">
              Demo — Admin: <strong>admin / admin123</strong> &nbsp;|&nbsp; Staff: <strong>staff / staff123</strong>
            </div>

            <div className="extra-links">
              New here?{" "}
              <span onClick={() => { setIsRegister(true); setLoginError(""); }}>
                Create Account
              </span>
              <br />
              How to use FoodApp?{" "}
              <span onClick={() => navigate("/guide")}>Read guide</span>
            </div>
          </>
        )}

        {/* REGISTER */}
        {isRegister && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="e.g. rahul123"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="rahul@example.com"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              />
            </div>

            {/* Error message */}
            {registerError && <div className="error-msg">⚠️ {registerError}</div>}

            <button className="login-btn" onClick={handleRegister}>Sign Up</button>

            <div className="extra-links">
              Already have an account?{" "}
              <span onClick={() => { setIsRegister(false); setRegisterError(""); }}>
                Login
              </span>
            </div>
          </>
        )}

        <div className="bottom-text">FoodApp — Smart Restaurant System</div>
      </div>

    </div>
  );
}

export default Login;