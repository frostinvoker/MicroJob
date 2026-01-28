# API Endpoints Reference

## Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: Update `REACT_APP_API_BASE` in client `.env`

## Authentication Required
Routes marked with 🔒 require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Users Routes

### Register User
- **URL**: `/users/register`
- **Method**: `POST`
- **Body**:
```json
{
  "phoneNumber": "09123456789",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "message": "Successfully registered.",
  "id": "user_id"
}
```

### Login User
- **URL**: `/users/login`
- **Method**: `POST`
- **Body**:
```json
{
  "phoneNumber": "09123456789",
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "message": "Login successful.",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "09123456789",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Logout User 🔒
- **URL**: `/users/logout`
- **Method**: `POST`
- **Response**:
```json
{
  "message": "Logout successful."
}
```

### Get All Users
- **URL**: `/users/userlist`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "_id": "user_id",
    "phoneNumber": "09123456789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
]
```

---

## Categories Routes

### Get All Categories
- **URL**: `/categories`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "_id": "category_id",
    "name": "Web Development",
    "description": "Web development tasks"
  }
]
```

### Create Category 🔒
- **URL**: `/categories`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "Web Development",
  "description": "Web development tasks"
}
```
- **Response**:
```json
{
  "message": "Category created successfully.",
  "category": {
    "_id": "category_id",
    "name": "Web Development"
  }
}
```

### Update Category 🔒
- **URL**: `/categories/:id`
- **Method**: `PUT`
- **Body**:
```json
{
  "name": "Full Stack Development"
}
```
- **Response**:
```json
{
  "message": "Category updated successfully.",
  "category": {
    "_id": "category_id",
    "name": "Full Stack Development"
  }
}
```

### Delete Category 🔒
- **URL**: `/categories/:id`
- **Method**: `DELETE`
- **Response**:
```json
{
  "message": "Category deleted successfully."
}
```

---

## Jobs Routes

### Get All Jobs
- **URL**: `/jobs`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "_id": "job_id",
    "title": "Build a Website",
    "description": "Create a responsive website",
    "category": "category_id",
    "price": 500,
    "status": "Available",
    "createdBy": "user_id"
  }
]
```

### Get Available Jobs
- **URL**: `/jobs/available`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "_id": "job_id",
    "title": "Build a Website",
    "status": "Available"
  }
]
```

### Get Jobs by Category
- **URL**: `/jobs/category/:categoryId`
- **Method**: `GET`
- **Response**: Array of jobs in that category

### Get Job Details
- **URL**: `/jobs/:id`
- **Method**: `GET`
- **Response**:
```json
{
  "_id": "job_id",
  "title": "Build a Website",
  "description": "Create a responsive website",
  "category": "category_id",
  "price": 500,
  "image": "image_url",
  "status": "Available",
  "createdBy": "user_id",
  "applicants": [],
  "selectedApplicant": null
}
```

### Create Job 🔒
- **URL**: `/jobs`
- **Method**: `POST`
- **Body**:
```json
{
  "title": "Build a Website",
  "description": "Create a responsive website",
  "category": "category_id",
  "price": 500,
  "image": "image_url"
}
```
- **Response**:
```json
{
  "message": "Job created successfully.",
  "job": {
    "_id": "job_id",
    "title": "Build a Website"
  }
}
```

### Apply for Job 🔒
- **URL**: `/jobs/:jobId/apply`
- **Method**: `POST`
- **Response**:
```json
{
  "message": "Applied successfully."
}
```

### Get Job Applicants 🔒
- **URL**: `/jobs/:jobId/applicants`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "09123456789"
  }
]
```

### Select Applicant 🔒
- **URL**: `/jobs/:jobId/select/:applicantId`
- **Method**: `PATCH`
- **Response**:
```json
{
  "message": "Applicant selected successfully."
}
```

### Change Job Status 🔒
- **URL**: `/jobs/:id/status`
- **Method**: `PATCH`
- **Body**:
```json
{
  "status": "Completed"
}
```
- **Response**:
```json
{
  "message": "Job status updated successfully."
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing Fields."
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required."
}
```

### 403 Forbidden
```json
{
  "message": "Invalid or expired token."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found."
}
```

### 409 Conflict
```json
{
  "message": "Resource already exists."
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error."
}
```

---

## Using with JavaScript/React

### Example: Login and Make Authenticated Request
```javascript
import { loginUser, getJobs } from './services/api';

async function handleLogin() {
  try {
    const response = await loginUser({
      phoneNumber: '09123456789',
      password: 'password'
    });
    
    // Token is automatically stored in localStorage
    localStorage.setItem('token', response.token);
    
    // Now make authenticated requests
    const jobs = await getJobs();
    console.log(jobs);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
}
```

### Example: Create a Job
```javascript
import { createJob } from './services/api';

async function handleCreateJob() {
  try {
    const response = await createJob({
      title: 'Build a Website',
      description: 'Create a responsive website',
      category: 'category_id',
      price: 500,
      image: 'image_url'
    });
    
    console.log('Job created:', response.job);
  } catch (error) {
    console.error('Failed to create job:', error.message);
  }
}
```

---

## Status Codes Summary

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource successfully created |
| 400 | Bad Request - Invalid request body |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal server error |
