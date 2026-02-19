# Todo App - Full Stack

A modern, full-stack task management application with React frontend and Node.js/Express backend. Featuring category-based organization, persistent storage, and seamless API integration.

---

## 📋 Project Overview

The Todo App is a comprehensive task management solution designed to help users organize their personal and professional tasks efficiently. It features a responsive React frontend with a robust Express.js backend API.

### Key Capabilities

- Create, read, update, and delete tasks (CRUD operations)
- Organize tasks into Personal and Professional categories
- Mark tasks as complete/incomplete
- Persist data with browser localStorage and optional backend sync
- Real-time cross-tab synchronization
- Responsive design for desktop and mobile devices

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│     React Frontend (Port 3000)          │
│  ├─ Components (React 19.2.4)           │
│  ├─ Custom Hooks (State Management)     │
│  ├─ localStorage (Persistence)          │
│  └─ Axios (API Communication)           │
└──────────────┬──────────────────────────┘
               │
               │ HTTP/REST
               │
┌──────────────▼──────────────────────────┐
│    Express.js Backend (Port 5000)       │
│  ├─ TypeScript (Type Safety)            │
│  ├─ RESTful API (4 Endpoints)           │
│  ├─ File-based Storage (JSON)           │
│  └─ Error Handling & Validation         │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Version | Purpose      |
| ---------------- | ------- | ------------ |
| React            | 19.2.4  | UI Framework |
| TypeScript       | 4.9.5   | Type Safety  |
| Axios            | Latest  | HTTP Client  |
| Create React App | Latest  | Build Tool   |

### Backend

| Technology | Version | Purpose       |
| ---------- | ------- | ------------- |
| Node.js    | v16+    | Runtime       |
| Express    | Latest  | Web Framework |
| TypeScript | 4.9.5   | Type Safety   |
| UUID       | Latest  | Unique IDs    |

---

## 📁 Project Structure

```
todo-app/
├── README.md                          # This file - Project overview
├── frontend/                          # React application
│   ├── src/
│   │   ├── components/                # React components
│   │   ├── hooks/                     # Custom hooks (useLocalStorage, useTasks)
│   │   ├── services/                  # API client (api.ts)
│   │   ├── types/                     # TypeScript interfaces
│   │   ├── utils/                     # Utility functions
│   │   ├── App.tsx                    # Main component
│   │   └── App.css                    # Styling
│   ├── public/                        # Static files
│   ├── package.json                   # Dependencies
│   ├── tsconfig.json                  # TypeScript config
│   └── README.md                      # Frontend documentation
│
├── backend/                           # Express API
│   ├── src/
│   │   ├── controllers/               # Request handlers
│   │   ├── middleware/                # Express middleware
│   │   ├── models/                    # Data models
│   │   ├── routes/                    # API routes
│   │   ├── types/                     # TypeScript interfaces
│   │   ├── utils/                     # Utility functions
│   │   └── server.ts                  # Entry point
│   ├── data/                          # JSON storage (auto-created)
│   ├── package.json                   # Dependencies
│   ├── tsconfig.json                  # TypeScript config
│   └── README.md                      # Backend documentation
│
└── IMPLEMENTATION_PLAN.md             # Detailed task breakdown
```

---

## 🚀 Quick Start

### Prerequisites

Ensure you have installed:

```bash
node --version   # v16.0.0 or higher
npm --version    # v7.0.0 or higher
```

### Backend Setup (5 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

**Full Setup Guide:** See [backend/README.md](./backend/README.md)

### Frontend Setup (5 minutes)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start

# App opens at http://localhost:3000
```

**Full Setup Guide:** See [frontend/README.md](./frontend/README.md)

### Verify Both are Running

```bash
# Test backend API
curl http://localhost:5000/api/health

# Application should be accessible at
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

---

## 📚 Documentation

### Frontend Documentation

Complete guide to React components, custom hooks, API integration, and styling.

- Component structure and props
- Custom hooks (useLocalStorage, useTasks)
- Development tips and debugging
- Deployment instructions

**→ Read [frontend/README.md](./frontend/README.md)**

---

### Backend Documentation

Complete API reference with endpoints, testing, error handling, and deployment.

- All 4 REST endpoints with examples
- Request/response formats
- Error handling and status codes
- Testing with cURL and Postman

**→ Read [backend/README.md](./backend/README.md)**

---

## 🎯 API Endpoints

All endpoints are prefixed with `/api`

| Method | Endpoint     | Purpose            |
| ------ | ------------ | ------------------ |
| GET    | `/tasks`     | Retrieve all tasks |
| POST   | `/tasks`     | Create new task    |
| PUT    | `/tasks/:id` | Update task        |
| DELETE | `/tasks/:id` | Delete task        |

**Full Examples:** See [backend/README.md](./backend/README.md#-api-endpoints)

---

## 💾 Data Persistence

### Frontend

- **Primary:** Browser `localStorage` (automatic persistence)
- **Secondary:** Backend API sync (when available)
- **Offline Support:** Works without internet connection

### Backend

- **Storage:** JSON file (`data/tasks.json`)
- **Auto-created:** On first API call
- **Format:** Array of task objects with timestamps

---

## 🎯 Features

### Task Management

- ✅ Create tasks with description and category
- ✅ Mark tasks complete/incomplete
- ✅ Delete individual tasks
- ✅ Clear all completed tasks
- ✅ Real-time UI updates

### Organization

- ✅ Two categories: Personal & Professional
- ✅ Filter tasks by category
- ✅ Task count display
- ✅ Empty state handling

### User Experience

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Input validation (prevents empty tasks)
- ✅ Disabled button states (visual feedback)
- ✅ Cross-tab synchronization
- ✅ Intuitive UI with clear typography

### Developer Experience

- ✅ TypeScript for type safety
- ✅ Custom React hooks for state management
- ✅ Comprehensive error handling
- ✅ Detailed logging and debugging
- ✅ Well-documented code

---

## 🔄 Development Workflow

### Running Both Servers (Recommended Terminal Setup)

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Runs on port 5000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
# Runs on port 3000
```

### Making Changes

**Frontend Changes:**

- Edit files in `frontend/src/`
- Hot reload enabled (automatic refresh)
- Check `http://localhost:3000`

**Backend Changes:**

- Edit files in `backend/src/`
- Restart dev server (`npm run dev`)
- Check API at `http://localhost:5000/api`

---

## 🏗️ Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Creates optimized bundle in `build/` folder, ready for:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting

### Backend Build

```bash
cd backend
npm run build
npm start
```

Or deploy to:

- Heroku
- Railway
- Render
- AWS

**Full Deployment Guide:** See individual README files

---

## 🧪 Testing

### Manual Testing

**Using cURL (Backend):**

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Buy milk","category":"Personal"}'
```

**Using Browser (Frontend):**

- Navigate to `http://localhost:3000`
- Test all features manually
- Check browser DevTools console for errors

### Automated Testing

**Frontend:**

```bash
cd frontend
npm test
```

**Backend:**
See [backend/README.md](./backend/README.md#-testing) for test commands

---

## 🐛 Troubleshooting

### Port Already in Use

**Frontend (Port 3000):**

```bash
PORT=8080 npm start
```

**Backend (Port 5000):**

```bash
PORT=5001 npm run dev
```

### API Connection Issues

1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check `.env` file in frontend has correct API URL
3. Look for CORS errors in browser console
4. Restart both servers

### Data Not Persisting

**Frontend:**

- Check localStorage: DevTools → Application → Storage → localStorage
- If empty, try: `localStorage.clear()` and refresh

**Backend:**

- Verify `data/tasks.json` exists
- Check file permissions: `chmod 644 data/tasks.json`
- Check terminal for error messages

**Full Troubleshooting:** See README files in each folder

---

## 📖 Implementation Plan

Detailed breakdown of all tasks and features implemented in this project.

**→ Read [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)**

---

## 🤝 Contributing

### Code Style

- Use TypeScript for type safety
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

### Adding Features

1. Create branch: `git checkout -b feature/feature-name`
2. Make changes following code style
3. Test thoroughly
4. Commit with descriptive message
5. Push and create pull request

### Reporting Issues

Include:

- What you were doing
- What went wrong
- Error messages
- Environment (OS, Node version, etc.)

---

## 📝 Environment Variables

### Frontend (.env in frontend/)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DEBUG_MODE=false
```

### Backend (.env in backend/)

```env
PORT=5000
NODE_ENV=development
```

---

## 🚀 Next Steps

### Enhancements

- [ ] Add user authentication
- [ ] Implement task due dates
- [ ] Add task priority levels
- [ ] Create dark mode toggle
- [ ] Add task search functionality
- [ ] Implement task recurrence
- [ ] Create unit tests
- [ ] Add e2e tests with Cypress
- [ ] Migrate to database (MongoDB/PostgreSQL)

### Deployment

- [ ] Deploy backend to Railway/Heroku
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables for production

---

## 📞 Support

For detailed information:

- **Frontend Issues:** See [frontend/README.md](./frontend/README.md#-troubleshooting)
- **Backend Issues:** See [backend/README.md](./backend/README.md#-troubleshooting)
- **General Questions:** Check [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

---

## 📄 License

This project is part of the EVRO Assessment.

---

## 👥 Team

**Project:** EVRO Assessment Todo Application  
**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** February 2026

---

**Ready to get started?** Begin with the [Quick Start](#-quick-start) section above!
