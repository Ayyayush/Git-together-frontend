# 🚀 GitTogether – Frontend (UI)

GitTogether Frontend is a **production-style React application** built to complement the GitTogether backend.  
It follows **real-world frontend architecture**, focuses on **auth persistence, security, clean state management**, and delivers a **polished, responsive UI**.

This is not just UI — it’s a **backend-aware frontend**.

---

## 🧠 What is GitTogether UI?

The frontend powers a **developer connection platform** where users can:

- Sign up & log in securely
- Stay logged in even after refresh
- Browse a smart feed of developers
- Send connection requests (Interested / Ignore)
- View connections & requests
- Manage profile & logout safely

All UI behavior strictly follows **backend APIs and business rules**.

---

## 🏗️ Key Features Implemented

### 🔐 Authentication & Security
- Signup & Login flows completed
- HTTP-only cookie–based auth (no tokens in localStorage)
- Auth persistence (auto-login on refresh)
- Backend-driven session validation
- Secure logout flow
- Protected routes (unauthenticated users blocked)

---

### 🔁 Auth Persistence (Important)
- Redux state resets on refresh → handled properly
- Backend is treated as **final authority**
- User session is rehydrated on app load
- Real-world production behavior (LinkedIn-style)

---

### 🧭 Routing & Layout
- React Router–based routing
- Public routes: Login, Signup, Landing
- Protected routes: Feed, Profile, Requests
- Layout-based routing using `Body` as:
  - Shared layout
  - Security gate
- Clean separation of routing & UI

---

### 🗃️ State Management (Redux Toolkit)
- Global Redux store setup
- Centralized slices:
  - User slice (auth & profile data)
  - Connection slice (connections & requests)
- Redux used as **cache**, not source of truth
- UI reacts automatically to state updates

---

### 📰 Feed System
- Feed page showing developer cards
- Tinder-style card layout
- Each card supports:
  - Interested (send request)
  - Ignore
- Shimmer loader while feed loads
- Empty-feed fallback message
- UI fully driven by backend feed APIs

---

### 🤝 Connections & Requests
- “Interested” sends connection request
- Connections page:
  - Shows accepted connections
- Requests page:
  - Shows incoming requests
- All APIs aligned strictly with backend
- Earlier API mismatches fixed properly

---

### 🧩 Validation System
- Centralized validation logic
- Clean, reusable validation functions
- Signup validation:
  - Required fields
  - Name length
  - Email format
  - Strong password rules
- Login validation:
  - Prevent empty submissions
  - Clear error feedback
- No silent failures

---

### 🎨 UI & UX Enhancements
- Fully responsive design
- Mobile-first approach
- Modern layout using Tailwind + DaisyUI
- Polished Navbar:
  - Profile dropdown
  - Logout fix
  - Theme toggle (Dark / Light)
  - Mobile sidebar toggle
- Landing page:
  - SaaS-style content
  - Improved typography
  - CTA alignment
  - Gradient background

---

### 🔔 Feedback & UX
- Toast notifications for:
  - Login success / failure
  - Signup feedback
- Clear error messages
- Smooth navigation
- No confusing blank states

---

## 🛠️ Tech Stack

- **React.js**
- **React Router DOM**
- **Redux Toolkit**
- **Axios**
- **Tailwind CSS**
- **DaisyUI**

---

## 🧠 Engineering Principles Followed

- Backend-first thinking
- No trust on frontend state
- Clean separation of concerns
- Centralized logic
- Scalable folder structure
- Production-style auth handling

> Frontend is treated as a **secure client**, not a trusted one.

---

---

## 🚀 Current Status

✅ Auth flow complete  
✅ Feed UI stable  
✅ Connections & requests integrated  
✅ UI polished & responsive  
✅ End-to-end flow tested  

---
---

## 🙌 Credits

Inspired by **Namaste React / Namaste Node.js – Akshay Saini**

---

⭐ If you like this project, feel free to star the repository!

as you have seen most of my forntend code now update my readme.md accoridnlgy and give 