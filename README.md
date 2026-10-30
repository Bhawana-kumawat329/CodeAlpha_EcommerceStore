A full-stack, responsive E-Commerce web application built using **Node.js**, **Express.js**, **lowdb** (JSON-based persistent storage), and **Vanilla JavaScript / HTML5 / CSS3**. Standardized for the Indian market with **INR (₹)** pricing, UPI & Cash on Delivery payment simulations, persistent cart state, and order tracking.

---

## 🚀 Features

- **15-Product Catalog**: Rich product display with brand badges, quality ratings, detailed specifications, and images.
- **Persistent Shopping Cart**: Uses `localStorage` to keep cart items intact even after page refreshes.
- **Detailed Cart View**: Cart modal displays product thumbnails, brand names, single-line descriptions, prices, and quantity controls (`+` / `-`).
- **Instant "Buy Now" Checkout**: Skip the cart and proceed straight to payment from product cards or detail modals.
- **Indian Payment Methods**: Select between **UPI (GPay / PhonePe / Paytm)** with VPA validation or **Cash on Delivery (COD)**.
- **Dynamic Order Status**: Orders placed via UPI show as `Paid (UPI Verified)` while COD orders show `Pending (Pay on Delivery)`.
- **JWT Authentication**: User registration and login flow powered by JSON Web Tokens.
- **Order History Modal**: Track past purchases, including itemized breakdowns, total paid, and order timestamps.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: Lowdb (JSON persistence)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
