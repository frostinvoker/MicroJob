# MicroJobs - Setup Guide

## Project Structure

```
MicroJobs/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Node.js backend (Express)
└── Mobile/          # Mobile app (if applicable)
```

## Backend Setup (Server)

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/MicroJob
JWT_SECRET=your_jwt_secret_key_here
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### 3. Start the Server
```bash
npm run dev          # Development mode with hot reload
# or
npm start            # Production mode
```

The server will run on `http://localhost:5000`

### 4. Available API Routes

- **Users**: `/api/users/`
  - `POST /register` - Register a new user
  - `POST /login` - Login user
  - `POST /logout` - Logout user
  - `GET /userlist` - Get all users

- **Categories**: `/api/categories/`
  - `GET /` - Get all categories
  - `POST /` - Create category (requires auth)
  - `PUT /:id` - Update category (requires auth)
  - `DELETE /:id` - Delete category (requires auth)

- **Jobs**: `/api/jobs/`
  - `GET /` - Get all jobs
  - `GET /available` - Get available jobs
  - `GET /category/:categoryId` - Get jobs by category
  - `GET /:id` - Get job details
  - `POST /` - Create job (requires auth)
  - `POST /:jobId/apply` - Apply for job (requires auth)
  - `GET /:jobId/applicants` - Get job applicants (requires auth)
  - `PATCH /:jobId/select/:applicantId` - Select applicant (requires auth)
  - `PATCH /:id/status` - Change job status (requires auth)

## Frontend Setup (Client)

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure Environment
Create a `.env` file in the client directory:
```env
REACT_APP_API_BASE=http://localhost:5000/api
```

### 3. Start the Development Server
```bash
npm start
```

The client will run on `http://localhost:5173`

## API Communication

### Authentication Flow

1. **Registration**
```javascript
import { registerUser } from './services/api';

const response = await registerUser({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepassword'
});
```

2. **Login**
```javascript
import { loginUser } from './services/api';

const response = await loginUser({
  emailOrUsername: 'john@example.com',
  password: 'securepassword'
});

// Save token to localStorage
localStorage.setItem('token', response.token);
```

3. **Protected Requests**
The token is automatically added to all requests in the Authorization header.

### Using API Services

All API functions are in `client/src/services/api.ts`:

```typescript
import {
  getCategories,
  getJobs,
  createJob,
  applyForJob,
  loginUser,
} from './services/api';

// Get all categories
const categories = await getCategories();

// Get all jobs
const jobs = await getJobs();

// Create a new job (requires authentication)
const newJob = await createJob({
  title: 'Web Development',
  description: 'Build a website',
  category: 'categoryId',
  price: 500,
  image: 'url'
});
```

## Fixing Common Issues

### 1. CORS Errors
- Ensure `CLIENT_ORIGIN` in server `.env` matches your client URL
- Default: `http://localhost:5173`

### 2. "Cannot GET /api/..." 
- Routes are registered with `/api/` prefix in server
- Check that route files are imported in `server/index.js`

### 3. 401 Unauthorized
- Token must be provided in Authorization header: `Bearer <token>`
- Token is automatically handled by the API service
- Ensure token is stored in localStorage

### 4. MongoDB Connection Errors
- Ensure MongoDB is running: `mongod` or via Docker
- Check `MONGO_URI` in `.env` is correct
- Default: `mongodb://localhost:27017/MicroJob`

## File Changes Made

### Server
- ✅ Fixed merge conflicts in `package.json`
- ✅ Standardized to ES6 modules (`type: "module"`)
- ✅ Registered all routes in `index.js`
- ✅ Updated auth middleware to accept Bearer tokens
- ✅ Fixed login controller to return token and user data
- ✅ Added `.env.example` template

### Client
- ✅ Created comprehensive `services/api.ts` with all API functions
- ✅ Updated `src/api/auth.ts` to re-export from services
- ✅ Added Vite proxy configuration for `/api` calls
- ✅ Fixed API base URL to port 5000

## Running Both Servers

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend
```bash
cd client
npm start
```

Both will now communicate seamlessly!
