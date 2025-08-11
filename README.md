
# 📝 MERN Blog

A full-stack **MERN** (MongoDB, Express, React, Node.js) blog application where users can register, log in, create, edit, and delete blog posts.

---

## 🚀 Features
- User authentication (JWT + cookies)
- Create, edit, delete, and view blog posts
- Responsive design with Tailwind CSS
- Secure cookie handling for login/logout
- SPA routing with Vite + React Router
- Deployment ready for **Render** (backend) & **Netlify** (frontend)

---

## 🛠️ Tech Stack
**Frontend:**
- React + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser
- dotenv

---

## 📂 Project Structure


---

## ⚙️ Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/PM36coder/mern-blog
cd mern-blog

Backend (.env)

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SECURE=development  # change to production when deployed
