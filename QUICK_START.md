# 🚀 Quick Start Guide - MicroJobs

## 5-Minute Setup

### Step 1: Install Dependencies (Backend) - 1 min
```bash
cd server
npm install
```

### Step 2: Create Server Environment File - 1 min
Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/MicroJob
JWT_SECRET=your_secret_key_change_this_in_production
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Step 3: Start Backend - 30 sec
```bash
npm run dev
```
✅ Server running at http://localhost:5000

### Step 4: Install Dependencies (Frontend) - 1 min
```bash
cd ../client
npm install
```

### Step 5: Start Frontend - 30 sec
```bash
npm start
```
✅ Client running at http://localhost:5173

---

## You're Done! 🎉

Now you can:
- Register new users at http://localhost:5173/signup
- Login at http://localhost:5173/signin
- Browse jobs and categories
- Create and manage jobs
- Apply for jobs

---

## Folder Structure

```
MicroJobs/
├── server/          # Backend (Node.js + Express)
│  ├── .env          # Environment variables
│  ├── index.js      # Main server file
│  ├── package.json  # Dependencies
│  ├── routes/       # API routes
│  ├── controllers/  # Business logic
│  ├── models/       # Database schemas
│  └── middleware/   # Auth & logging
│
├── client/          # Frontend (React + Vite)
│  ├── .env          # Environment variables
│  ├── package.json  # Dependencies
│  ├── vite.config.ts # Build config
│  └── src/
│     ├── services/api.ts  # API client
│     ├── pages/           # Page components
│     ├── components/      # Reusable components
│     └── App.tsx         # Main app
│
└── docs/            # Documentation
   ├── SETUP_GUIDE.md
   ├── API_REFERENCE.md
   ├── ARCHITECTURE.md
   └── ...
```

---

## Key API Endpoints

```
POST   /api/users/register      Register new user
POST   /api/users/login         Login user
GET    /api/categories          Get all categories
GET    /api/jobs                Get all jobs
POST   /api/jobs                Create job (auth required)
POST   /api/jobs/:id/apply      Apply for job (auth required)
```

Full API reference: See `API_REFERENCE.md`

---

## API Usage Examples

### Register
```javascript
import { registerUser } from './services/api';

const result = await registerUser({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'password123'
});
```

### Login
```javascript
import { loginUser } from './services/api';

const result = await loginUser({
  emailOrUsername: 'john_doe',
  password: 'password123'
});

// Token automatically saved to localStorage
```

### Get Jobs
```javascript
import { getJobs } from './services/api';

const jobs = await getJobs();
console.log(jobs);
```

### Create Job (Requires Auth)
```javascript
import { createJob } from './services/api';

const newJob = await createJob({
  title: 'Build a Website',
  description: 'Create a responsive website',
  category: 'categoryId',
  price: 500
});
```

---

## Common Commands

### Backend
```bash
cd server

# Start development server with hot reload
npm run dev

# Start production server
npm start

# Install packages
npm install

# Run specific package
npm install <package-name>
```

### Frontend
```bash
cd client

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject (WARNING: cannot be undone)
npm eject
```

---

## Environment Variables

### Server (.env)
| Variable | Value | Purpose |
|----------|-------|---------|
| PORT | 5000 | Server port |
| MONGO_URI | mongodb://... | Database connection |
| JWT_SECRET | random string | Token encryption key |
| CLIENT_ORIGIN | http://localhost:5173 | CORS origin |
| NODE_ENV | development | Environment mode |

### Client (.env)
| Variable | Value | Purpose |
|----------|-------|---------|
| REACT_APP_API_BASE | http://localhost:5000/api | API endpoint |

---

## Troubleshooting

### "Cannot find module"
```bash
# In server or client directory
npm install
```

### "Port 5000 already in use"
```bash
# Kill the process (Mac/Linux)
lsof -i :5000
kill -9 <PID>

# Or change PORT in .env to 5001
```

### "MongoDB connection failed"
```bash
# Make sure MongoDB is running
# Mac with Homebrew
brew services start mongodb-community

# Windows
# Start MongoDB from Services or manually
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in .env
```

### "Token errors / 401 Unauthorized"
```javascript
// Check if token is in localStorage
console.log(localStorage.getItem('token'));

// Or login again to get new token
```

### CORS errors
- Check `CLIENT_ORIGIN` in server `.env` matches your client URL
- Ensure it's `http://localhost:5173` for local development

---

## Database Backup & Reset

### View Collections
```javascript
// In MongoDB shell
use MicroJob
show collections
db.users.find()
db.jobs.find()
```

### Reset Database
```javascript
// WARNING: Deletes all data!
use MicroJob
db.dropDatabase()
```

---

## Development Tips

### 1. Enable Debug Mode
```bash
# Backend
DEBUG=* npm run dev

# Frontend
set REACT_APP_DEBUG=true && npm start
```

### 2. Check Network Requests
- Open DevTools (F12)
- Go to Network tab
- Check API requests and responses
- Look for errors in Console tab

### 3. Database Debugging
```javascript
// Add to controllers for debugging
console.log('Incoming request:', req.body);
console.log('User:', req.user);
console.log('Query result:', result);
```

### 4. API Testing with Postman
1. Download Postman
2. Create new requests for each endpoint
3. Add Authorization header for protected routes:
   ```
   Authorization: Bearer <your_token>
   ```

### 5. VS Code Extensions
- Thunder Client (for API testing)
- REST Client (for .http files)
- MongoDB for VS Code
- Prettier (code formatter)
- ESLint (code quality)

---

## Performance Optimization

### For Faster Development
1. Use `npm run dev` with nodemon (auto-restart on changes)
2. Use hot reload in React with Vite
3. Keep MongoDB indexed for common queries
4. Use pagination for large datasets

### For Production
1. Build frontend: `npm build`
2. Use environment variables
3. Enable HTTPS
4. Setup caching headers
5. Use CDN for static files

---

## Useful Resources

- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Guide](https://jwt.io)
- [Vite Docs](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## File References

| Document | Contains |
|----------|----------|
| SETUP_GUIDE.md | Detailed setup instructions |
| API_REFERENCE.md | All API endpoints with examples |
| ARCHITECTURE.md | System design and flow diagrams |
| CONNECTION_FIXES.md | What was fixed and why |
| VERIFICATION_CHECKLIST.md | Testing and validation steps |
| COMPLETE_FIX_SUMMARY.md | Comprehensive fix details |

---

## Getting Help

### Check Logs
```bash
# Backend logs
# Look in terminal where you ran 'npm run dev'

# Frontend logs
# Open browser console (F12)
```

### Common Issues & Fixes
See `VERIFICATION_CHECKLIST.md` for troubleshooting guide

### Manual Tests
1. Try registering a new account
2. Login and check localStorage for token
3. Visit different pages
4. Check browser console for errors
5. Check server logs for issues

---

## Next Steps

1. ✅ Run server and client
2. ✅ Test register/login
3. ✅ Explore API endpoints
4. ✅ Build UI pages
5. ✅ Add more features
6. ✅ Write tests
7. ✅ Deploy to production

---

## Ready to Build! 🎯

Everything is connected and working. Start building your features!

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm start

# Browser
http://localhost:5173
```

Happy coding! 💻
