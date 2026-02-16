# Todo App Backend API

A RESTful API for managing tasks built with Node.js, Express, and TypeScript. Features task creation, completion, deletion, and categorization with file-based storage.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)

---

## Features

✅ Create, read, update, and delete tasks
✅ Categorize tasks (Personal / Professional)
✅ Task completion toggle
✅ UUID-based task IDs
✅ Automatic timestamps
✅ File-based JSON storage
✅ Request validation middleware
✅ CORS enabled
✅ Request logging with Morgan
✅ Comprehensive error handling

---

## Prerequisites

- Node.js v18+ ([Download](https://nodejs.org/))
- npm or yarn package manager
- Git (for version control)
- Postman or cURL (for API testing - optional)

**Verify installation:**

```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

---

## Setup & Installation

### 1. Clone or Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This installs:

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger
- **uuid** - Unique ID generation
- **typescript** - Type safety
- **@types/\*** - TypeScript definitions
- **ts-node** - TypeScript executor
- **nodemon** - Development auto-reload

### 3. Verify Installation

```bash
npm list
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory (optional):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# API Configuration
API_PREFIX=/api

# Storage
DATA_DIR=./data
```

**Default Configuration:**

- Port: `5000`
- Environment: `development`
- Storage: `./data/tasks.json`

---

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

Expected output:

```
[nodemon] starting `ts-node src/server.ts`
Server running on http://localhost:5000
Health check: http://localhost:5000/health
```

### Production Mode

```bash
# Build TypeScript
npm run build

# Start server
npm start
```

### Check Server Health

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{
  "status": "healthy",
  "timestamp": "2024-02-16T10:30:45.123Z"
}
```

---

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

### 1. Get All Tasks

**Endpoint:** `GET /tasks`

**Description:** Retrieve all tasks

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "description": "Buy groceries",
      "completed": false,
      "category": "Personal",
      "createdAt": "2024-02-16T10:00:00.000Z",
      "updatedAt": "2024-02-16T10:00:00.000Z"
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "description": "Complete project report",
      "completed": true,
      "category": "Professional",
      "createdAt": "2024-02-16T11:00:00.000Z",
      "updatedAt": "2024-02-16T11:30:00.000Z"
    }
  ]
}
```

**cURL Example:**

```bash
curl http://localhost:5000/api/tasks
```

---

### 2. Create Task

**Endpoint:** `POST /tasks`

**Description:** Create a new task

**Request Body:**

```json
{
  "description": "Buy groceries",
  "category": "Personal"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "description": "Buy groceries",
    "completed": false,
    "category": "Personal",
    "createdAt": "2024-02-16T10:00:00.000Z",
    "updatedAt": "2024-02-16T10:00:00.000Z"
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Buy groceries",
    "category": "Personal"
  }'
```

**Validation Rules:**

- `description` (required): Non-empty string, max 500 characters
- `category` (required): Must be "Personal" or "Professional"

---

### 3. Update Task

**Endpoint:** `PUT /tasks/:id`

**Description:** Update an existing task

**Request Body:**

```json
{
  "description": "Buy groceries and cook dinner",
  "completed": true
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "description": "Buy groceries and cook dinner",
    "completed": true,
    "category": "Personal",
    "createdAt": "2024-02-16T10:00:00.000Z",
    "updatedAt": "2024-02-16T10:15:00.000Z"
  }
}
```

**cURL Example:**

```bash
curl -X PUT http://localhost:5000/api/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

**Path Parameters:**

- `id` (required): Valid UUID format

**Request Body:**

- `description` (optional): New task description
- `completed` (optional): Boolean value

---

### 4. Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Description:** Delete a task

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**cURL Example:**

```bash
curl -X DELETE http://localhost:5000/api/tasks/123e4567-e89b-12d3-a456-426614174000
```

**Path Parameters:**

- `id` (required): Valid UUID format

---

## Testing

### Manual Testing with cURL

#### Test 1: Create a Personal Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Buy milk","category":"Personal"}'
```

#### Test 2: Create a Professional Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Finish quarterly review","category":"Professional"}'
```

#### Test 3: Get All Tasks

```bash
curl http://localhost:5000/api/tasks
```

#### Test 4: Update a Task (mark as complete)

```bash
curl -X PUT http://localhost:5000/api/tasks/YOUR_TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

#### Test 5: Delete a Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/YOUR_TASK_ID
```

---

### Edge Case Testing

#### ❌ Empty Description

**Expected:** 400 Bad Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"","category":"Personal"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Description cannot be empty or whitespace only"
}
```

---

#### ❌ Whitespace-only Description

**Expected:** 400 Bad Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"   ","category":"Personal"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Description cannot be empty or whitespace only"
}
```

---

#### ❌ Invalid Category

**Expected:** 400 Bad Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Buy groceries","category":"Urgent"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Category must be one of: Personal, Professional"
}
```

---

#### ❌ Missing Description

**Expected:** 400 Bad Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"category":"Personal"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Description is required and must be a string"
}
```

---

#### ❌ Missing Category

**Expected:** 400 Bad Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Buy groceries"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Category is required and must be a string"
}
```

---

#### ❌ Malformed JSON

**Expected:** 400 Bad Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{description:"Buy groceries"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Invalid JSON format"
}
```

---

#### ❌ Non-existent Task ID

**Expected:** 404 Not Found

```bash
curl -X PUT http://localhost:5000/api/tasks/123e4567-e89b-12d3-a456-000000000000 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Response:**

```json
{
  "success": false,
  "message": "Task not found"
}
```

---

#### ❌ Invalid UUID Format

**Expected:** 400 Bad Request

```bash
curl -X DELETE http://localhost:5000/api/tasks/invalid-id
```

**Response:**

```json
{
  "success": false,
  "message": "Invalid task ID format"
}
```

---

#### ❌ No Update Fields Provided

**Expected:** 400 Bad Request

```bash
curl -X PUT http://localhost:5000/api/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Response:**

```json
{
  "success": false,
  "message": "At least one field (description or completed) must be provided"
}
```

---

#### ❌ Invalid Completed Type

**Expected:** 400 Bad Request

```bash
curl -X PUT http://localhost:5000/api/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"completed":"yes"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Completed must be a boolean value"
}
```

---

### Postman Testing

1. **Import Collection:**
   - Create environment: `http://localhost:5000`
   - Create requests for each endpoint

2. **Test Cases:**
   - Create multiple tasks
   - Filter by category
   - Update completion status
   - Delete tasks
   - Test edge cases above

---

## Error Handling

The API returns consistent error responses:

### 400 Bad Request

**Cause:** Invalid input data

```json
{
  "success": false,
  "message": "Detailed error message"
}
```

### 404 Not Found

**Cause:** Task doesn't exist

```json
{
  "success": false,
  "message": "Task not found"
}
```

### 500 Internal Server Error

**Cause:** Server-side error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── taskController.ts      # Handler functions
│   ├── middleware/
│   │   ├── errorHandler.ts        # Global error handler
│   │   └── validator.ts           # Request validation
│   ├── models/
│   │   └── task.ts                # Task model class
│   ├── routes/
│   │   └── tasks.ts               # API routes
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── utils/
│   │   └── storage.ts             # File-based storage
│   └── server.ts                  # Entry point
├── data/
│   └── tasks.json                 # Persisted tasks (auto-created)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Troubleshooting

### Issue: Port 5000 already in use

**Solution:**

```bash
# Find process using port
lsof -i :5000

# Kill process (replace PID)
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### Issue: TypeScript compilation errors

**Solution:**

```bash
# Clear build cache
rm -rf dist/

# Rebuild
npm run build
```

### Issue: Data not persisting

**Solution:**

```bash
# Create data directory
mkdir -p data

# Check file permissions
chmod 644 data/tasks.json

# Verify storage.ts is being used
```

### Issue: CORS errors from frontend

**Solution:**
Update `src/server.ts`:

```typescript
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
```

### Issue: Tasks not appearing after restart

**Verify:**

1. `data/tasks.json` exists and contains data
2. Run `npm run dev` and check console for errors
3. Make a GET request to confirm tasks are loaded

---

## Development Tips

### Adding a New Endpoint

1. Create controller function in `src/controllers/taskController.ts`
2. Create route in `src/routes/tasks.ts`
3. Add validation middleware if needed
4. Test with cURL or Postman

### Modifying Task Model

1. Update `src/types/index.ts` interface
2. Update `src/models/task.ts` logic
3. Update storage methods if needed
4. Update validation rules

### Debugging

Enable detailed logging:

```typescript
// In server.ts
app.use(morgan("detailed"));
```

Check data file:

```bash
cat data/tasks.json
```

---

## Next Steps

- Integrate with React frontend
- Add unit tests with Jest
- Deploy to Heroku/Railway
- Add database (MongoDB/PostgreSQL)
- Implement authentication

---

**Need help?** Check the [main README](../README.md) or refer to [Express documentation](https://expressjs.com)
