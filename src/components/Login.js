import React, { useState } from "react";
import "./login.css";

function Login() {

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="container">

      <div className="left">
        <div className="icon">🍽️</div>
        <h1>{isRegister ? "Create Account" : "Welcome Back"}</h1>
        <p>Manage your restaurant, items, and orders with ease.</p>
        <div className="footer-left">© FoodApp</div>
      </div>

      <div className="card">

        <div className="card-top">
          <div className="lock-icon">{isRegister ? "👤" : "🔒"}</div>
          <h2>{isRegister ? "Create Account" : "Login"}</h2>
        </div>

       
        {!isRegister && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <button className="login-btn">Login</button>

            <div className="extra-links">
              New here?{" "}
              <span onClick={() => setIsRegister(true)}>
                Create Account
              </span>
              <br />
              How to use FoodApp? <span>Read guide</span>
            </div>
          </>
        )}

     
        {isRegister && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" />
            </div>

            <button className="login-btn">Sign Up</button>

            <div className="extra-links">
              Already have an account?{" "}
              <span onClick={() => setIsRegister(false)}>
                Login
              </span>
            </div>
          </>
        )}

        <div className="bottom-text">
          FoodApp — Smart Restaurant System
        </div>

      </div>

    </div>
  );
}

export default Login;