import React from 'react'
import "./readguide.css";
export default function Readguide() {
  return (
    <div>
        <div>

     
  


     
      <div className="header">

        <div className="icon-box">🍽️</div>

        <h1>How to Use FoodApp</h1>

        <p>
          FoodApp is a digital restaurant system for QR-based ordering,
          live kitchen tracking, and staff-friendly management.
        </p>

        <div className="tabs">
          <button>For Customers</button>
          <button>For Staff</button>
          <button>QR Setup</button>
          <button>FAQ</button>
        </div>

      </div>


      
      <div className="content">

        <div className="box">
          <h3>Overview</h3>
          <p>
            FoodApp streamlines dining with a QR-powered menu and a real-time
            staff dashboard. Customers scan the table QR, browse the menu,
            add items to the cart, and place an order. The kitchen sees live
            orders; staff update statuses (Pending → Preparing → Completed).
          </p>
        </div>


        <div className="box">
          <h3>For Customers</h3>

          <ol>
            <li>Scan the QR on your table to open the digital menu.</li>
            <li>Browse items and tap + Add to Cart.</li>
            <li>Open the cart and place your order.</li>
            <li>Your order becomes Pending for the kitchen.</li>
          </ol>

        </div>


        <div className="box grid">

          <div>
            <h3>For Staff & Admin</h3>

            <ul>
              <li>Open Kitchen & Revenue Dashboard</li>
              <li>See Active Orders</li>
              <li>Update status: Pending → Preparing → Completed</li>
              <li>Mark completed and collect payment</li>
            </ul>
          </div>

          <div>
            <h3>Menu Management</h3>

            <ul>
              <li>Add / Edit / Delete items</li>
              <li>Upload image, price, description</li>
              <li>See top selling items</li>
              <li>Generate QR codes for tables</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
    </div>
  )
}
