# Todo App - Frontend

A modern, responsive React application for managing personal and professional tasks. Features category-based organization, persistent local storage, and seamless API integration.

---

## 🎯 Features

- **Dual-Category Task Management** - Organize tasks into Personal and Professional categories
- **Task Description Validation** - Prevents empty task submissions with disabled button state
- **Persistent Storage** - Tasks saved to browser localStorage with automatic synchronization
- **Real-time Updates** - Changes instantly reflected across browser tabs
- **Optional API Sync** - Tasks can sync with backend API (fallback to localStorage if offline)
- **Responsive Design** - Mobile-friendly interface matching client mockup specifications
- **Intuitive UI** - Clean, cream-colored interface with orange accent highlights
- **Complete/Delete Operations** - Mark tasks as done or remove them with single click
- **Clear Completed Tasks** - Bulk delete all completed tasks action

---

## 🛠️ Tech Stack

| Technology       | Version | Purpose                              |
| ---------------- | ------- | ------------------------------------ |
| React            | 19.2.4  | UI framework                         |
| TypeScript       | 4.9.5   | Type-safe development                |
| Axios            | Latest  | HTTP client for API calls            |
| Create React App | Latest  | Development environment & build tool |

---

## 📋 Prerequisites

Ensure you have the following installed:

```bash
node --version  # v16.0.0 or higher
npm --version   # v7.0.0 or higher
```

**Optional:** Backend API server running on `http://localhost:5000` for full sync functionality.

---

## 📦 Setup & Installation

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File (Optional)

Create a `.env` file in the `frontend` directory to configure API settings:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

If not set, the app will use the default `http://localhost:5000` endpoint.

### 4. Verify Installation

```bash
npm list react axios
```

---

## 🚀 Running the Development Server

### Start Development Mode

```bash
npm start
```

This will:

- Start the development server on `http://localhost:3000`
- Open the app in your default browser
- Enable hot reload on file changes

### Start with Custom Port

```bash
PORT=8080 npm start
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CategoryTabs.tsx         # Personal/Professional category switcher
│   │   ├── TaskInput.tsx            # Form for creating new tasks
│   │   ├── TaskItem.tsx             # Individual task display with controls
│   │   └── TaskList.tsx             # Container for filtered tasks
│   ├── hooks/
│   │   ├── useLocalStorage.ts       # Browser storage persistence hook
│   │   └── useTasks.ts              # Task management hook with CRUD operations
│   ├── services/
│   │   └── api.ts                   # API client for backend communication
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces and types
│   ├── utils/
│   │   └── storage.ts               # Storage utility functions
│   ├── App.tsx                      # Main application component
│   ├── App.css                      # Complete styling (307 lines)
│   ├── index.tsx                    # React DOM render entry point
│   └── index.css                    # Global styles
├── public/
│   ├── index.html                   # HTML template
│   ├── manifest.json                # PWA manifest
│   └── robots.txt                   # SEO robots directive
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

---

## 🧩 Component Overview

### CategoryTabs.tsx

**Purpose:** Renders Personal/Professional category switcher  
**Props:** `activeCategory`, `onCategoryChange`  
**Styling:** Text-based tabs with orange underline for active tab  
**Features:**

- Click to switch between categories
- Visual feedback for active category
- Responsive design

### TaskInput.tsx

**Purpose:** Form component for creating new tasks  
**Props:** `onAddTask`, `activeCategory`  
**Features:**

- Input validation (disabled when empty)
- Automatic form clearing after submission
- "What do you need to do?" placeholder text
- Blue ADD button (#5ba3c7)
- Disabled state styling (gray background, not-allowed cursor)

### TaskItem.tsx

**Purpose:** Individual task display with controls  
**Props:** `task`, `onToggle`, `onDelete`  
**Features:**

- Checkbox for marking complete/incomplete
- Strikethrough text when completed
- SVG trash icon for deletion
- Hover effects on delete icon
- Task text and completion status display

### TaskList.tsx

**Purpose:** Container displaying category-filtered tasks  
**Props:** `tasks`, `activeCategory`, `onToggle`, `onDelete`, `onClearCompleted`  
**Features:**

- Filters tasks by selected category
- Displays completed task count
- Empty state message
- Clear completed tasks button with SVG trash icon
- Uses `display: flow-root` for proper layout

### App.tsx

**Purpose:** Main application component  
**Features:**

- Coordinates all child components
- Manages active category state
- Integrates useTasks hook
- Passes filtered data to children
- Handles all user interactions

---

## 🪝 Custom Hooks

### useLocalStorage Hook

Manages browser localStorage persistence with cross-tab synchronization.

```typescript
const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
```

**Features:**

- Lazy initialization (function called once)
- Automatic serialization/deserialization
- Cross-tab sync via storage events
- Function-based setState support

**Location:** [src/hooks/useLocalStorage.ts](src/hooks/useLocalStorage.ts)

---

### useTasks Hook

Centralized task management with CRUD operations and ref-based state.

```typescript
const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTasks();
```

**Methods:**

| Method           | Parameters                | Returns | Purpose                    |
| ---------------- | ------------------------- | ------- | -------------------------- |
| `addTask`        | `description`, `category` | `void`  | Create new task            |
| `toggleTask`     | `id`                      | `void`  | Mark complete/incomplete   |
| `deleteTask`     | `id`                      | `void`  | Remove task                |
| `clearCompleted` | none                      | `void`  | Delete all completed tasks |

**Features:**

- Uses `useRef` to avoid stale closure issues
- Non-blocking API calls (fire-and-forget)
- localStorage fallback when API unavailable
- Optimistic updates for better UX
- Automatic sync with backend

**Location:** [src/hooks/useTasks.ts](src/hooks/useTasks.ts)

---

## 🔌 API Integration

### Service Layer

The `api.ts` service provides centralized API communication:

```typescript
import taskApi from "./services/api";

// Get all tasks
const tasks = await taskApi.getTasks();

// Create task
await taskApi.createTask({ description: "Buy milk", category: "Personal" });

// Update task
await taskApi.updateTask(id, { completed: true });

// Delete task
await taskApi.deleteTask(id);
```

**Fallback Behavior:** If API is unavailable, tasks persist in localStorage without cloud sync.

**Location:** [src/services/api.ts](src/services/api.ts)

---

## 📜 Available Scripts

### Development

```bash
npm start
```

- Runs development server with hot reload
- Opens browser at `http://localhost:3000`
- Watches for file changes

### Production Build

```bash
npm run build
```

- Creates optimized production bundle in `build/` folder
- Minifies code and optimizes assets
- Ready for deployment to Vercel, Netlify, etc.

### Testing

```bash
npm test
```

- Launches test runner in watch mode
- Configure in `package.json`

### Type Checking

```bash
npx tsc --noEmit
```

- Checks TypeScript types without building
- Reports type errors without creating output

---

## 🎨 Design System

### Color Palette

| Color          | Hex       | Usage                  |
| -------------- | --------- | ---------------------- |
| Background     | `#f5f5f5` | Page background        |
| Container      | `#f0ebe5` | Task container (cream) |
| Primary Accent | `#ff9500` | Active tabs, icons     |
| Button         | `#5ba3c7` | ADD button (blue)      |
| Text Primary   | `#333`    | Active tab text        |
| Text Secondary | `#999`    | Inactive tab text      |
| Delete Icon    | `#d9797f` | Trash icons            |
| Disabled       | `#b0b0b0` | Disabled button        |

### Typography

- **Font:** System font stack (Arial, sans-serif)
- **Sizes:** 14px-16px body, 20px-24px headings
- **Weight:** 400 normal, 600 bold for accents

### Responsive Design

- **Breakpoint:** 768px
- **Mobile-first:** Design works from 320px width
- **Container:** 90% width on mobile, 600px max-width on desktop

---

## 🔧 Development Tips

### Adding a New Feature

1. **Create Component:** `src/components/NewComponent.tsx`
2. **Define Types:** Add interfaces to `src/types/index.ts`
3. **If State Logic:** Create hook in `src/hooks/`
4. **Add Styling:** Extend `src/App.css`
5. **Import in App:** Add to `src/App.tsx`

### Debugging State

Check browser DevTools:

```bash
# In console, access localStorage
localStorage.getItem('tasks')

# Clear all data
localStorage.clear()
```

### Testing Component Isolation

Modify `src/index.tsx`:

```typescript
import TaskInput from './components/TaskInput';
root.render(<TaskInput onAddTask={() => {}} activeCategory="Personal" />);
```

### Enable API Logging

Update `src/services/api.ts`:

```typescript
console.log("Request:", { description, category });
console.log("Response:", response.data);
```

### Common Issues

**Issue:** Tasks not persisting after refresh

- **Solution:** Check browser DevTools → Application → Storage → localStorage

**Issue:** API calls failing (network errors)

- **Solution:** Ensure backend server is running on port 5000
- **Check:** `curl http://localhost:5000/api/health`

**Issue:** Styles not applying

- **Solution:** Check CSS specificity or browser cache
- **Clear cache:** DevTools → ⋮ → Settings → Network → "Disable cache"

---

## 🏗️ Building for Production

### 1. Create Production Build

```bash
npm run build
```

### 2. Verify Build Size

```bash
# Show bundle analysis
npm run build -- --stats
```

### 3. Test Locally

```bash
npm install -g serve
serve -s build
```

Visit `http://localhost:3000` to test optimized build.

---

## 📤 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag 'build' folder to Netlify
```

### GitHub Pages

Update `package.json`:

```json
"homepage": "https://username.github.io/repo-name"
```

Then:

```bash
npm run build
npm run deploy
```

---

## 🔗 Related Documentation

- **Backend API:** See [../backend/README.md](../backend/README.md) for API documentation
- **Main Project:** See [../README.md](../README.md) for full project overview

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Find process
lsof -i :3000

# Kill process (replace PID)
kill -9 <PID>

# Or use different port
PORT=8080 npm start
```

### Node Modules Issues

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check types without building
npx tsc --noEmit

# Fix most common errors
npm run build -- --fix
```

### Blank Page After Starting

1. Check DevTools console for errors
2. Verify `public/index.html` has `<div id="root"></div>`
3. Clear browser cache: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
4. Restart dev server

### API Not Connecting

```bash
# Test API endpoint
curl http://localhost:5000/api/health

# Check .env file exists
cat .env

# Verify API_URL in src/services/api.ts
```

---

## 📝 Environment Variables

Create `.env` file in frontend directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Optional: Features
REACT_APP_ENABLE_API_SYNC=true
REACT_APP_DEBUG_MODE=false
```

**Note:** Variables must start with `REACT_APP_` to be accessible in the application.

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Create React App Docs](https://create-react-app.dev)
- [Axios Documentation](https://axios-http.com/)

---

## 🚀 Next Steps

- Add unit tests with Jest
- Implement e2e tests with Cypress
- Add error boundary for better error handling
- Implement task search functionality
- Add task priority levels
- Create dark mode toggle
- Add task due dates
- Implement task recurrence
- Add user authentication

---

**Last Updated:** Version 1.0.0  
**Maintainer:** EVRO Assessment Team  
**Status:** ✅ Production Ready
