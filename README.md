# Task Management System

## Overview

The Task Management System is a fullstack web application designed to help users efficiently organize, track, and manage their daily tasks. It allows users to securely register and log in, create and manage tasks with priorities, categories, due dates, and statuses, and view task statistics in a clean and responsive dashboard.

The project focuses on clean UI/UX, secure authentication, proper API design, and real-world fullstack development practices.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **API Documentation:** Swagger (OpenAPI)

## Setup Instructions

### Backend Setup

1. Clone the repository:
   ```run in terminal
   git clone <https://github.com/arjitdhuria/task-management-system.git>
   ```
   Navigate to backend:
   ```run in terminal
   cd backend
   
2. Install dependencies:
    ```run in terminal
    npm install
   
3. Setup database:
   create .env file in backend directory and add
   ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

4. Run migrations: NOT REQUIRED
   
5. Start server:
   ```
   npm run dev

### Frontend Setup

1. Navigate to frontend directory:
   ```
   cd frontend
2. Install dependencies:
   ```
   npm install
3. Configure API endpoints:
   Open the file:
   ```
   src/services/api.js
   ```
   Update the baseURL to point to the backend API:
   
   baseURL: "http://localhost:5000/api"
4. Start development server:
   ```
   npm run dev

## Features Implemented

### User Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Logout functionality

### Task Management
- Create, read, update, and delete tasks
- Task priorities (High, Medium, Low)
- Task statuses (Pending, In Progress, Completed)
- Due date selection
- Task categories/tags

### Dashboard
- Task statistics (Total, Completed, Pending)
- Filter tasks by status, priority, and category
- Search tasks by title
- Responsive card-based task layout

### API & Documentation
- RESTful backend APIs
- Swagger UI for API testing and documentation
  
Future enhancements:
  1. Multi language support
  2. Dashboard analytics- Progress of a person(daily/weekly).
  3. Dark mode support

### Live Demo
 - **Frontend (Vercel):**  
  https://task-management-system-seven-gilt.vercel.app

- **Backend (Render):**  
  https://task-management-backend-vo99.onrender.com

- **API Documentation (Swagger):**  
  https://task-management-backend-vo99.onrender.com/api-docs
     
## Challenges and Solutions
1. JWT Authentication & Protected Routes

Challenge: Maintaining authentication state after page refresh and protecting routes.
Solution: Used JWT stored in localStorage and restored authentication state using React Context.

2. A MongoDB Connection Timeout

Challenge: Backend failed to connect on Render.
Solution: Enabled 0.0.0.0/0 IP access(allowed access from anywhere) and corrected MongoDB credentials.
