# DevPal
A simple productivity and task management web application built using the MERN stack.
Users can register, login, create tasks, edit them, delete them, mark them as completed, and use a Pomodoro timer for focus sessions.
The app also supports dark mode and a collapsible sidebar for navigation.
---
## Features

- User Authentication (Register & Login)
- Create / Edit / Delete Tasks
- Mark tasks as Completed or Pending
- Dashboard showing Total / Completed / Pending task stats
- Pomodoro Timer with Focus / Short Break / Long Break modes
- Dark Mode toggle
- Sidebar navigation
- Responsive design

---

## Tech Stack
### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js, Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt password hashing

## Folder Structure
```bash
DevPal/
 ├── backend/
 │   ├── controllers/
 │   ├── routes/
 │   ├── models/
 │   ├── middleware/
 │   ├── server.js
 │   └── .env
 └── frontend/
     ├── src/
     ├── pages/
     ├── components/
     ├── context/
     ├── api/
     └── App.jsx
```
#### Environment Variables
Create a .env file inside backend folder:
```ini
PORT=5001
MONGO_URI=your_mongodb_cluster_uri
JWT_SECRET=any_secret_key
```
---
### How to Run Locally
**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

