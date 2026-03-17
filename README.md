# Done. - Minimalist To-Do Landing & Auth

A premium monorepo-based application with a stunning landing page for a to-do application and a robust authentication system (signup, login, profile, logout).

## Tech Stack
- **Frontend**: Vanilla HTML, CSS, Javascript (Apple-style minimalism).
- **Backend**: Node.js, Express.
- **Database**: MySQL.
- **Auth**: JWT (JSON Web Tokens) with Bcrypt password hashing.

## Getting Started

### 1. Prerequisites
- Node.js installed.
- MySQL server running.

### 2. Database Setup
Create a database named `todo_auth_db`:
```sql
CREATE DATABASE todo_auth_db;
```

### 3. Backend Setup
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Configure environment:
   - Create a `.env` file based on `.env.example`.
   - Update `DB_USER`, `DB_PASSWORD`, and `DB_NAME`.
4. Run the server: `node index.js`

### 4. Frontend Setup
1. Open `client/index.html` in your browser.
2. (Optional) Use a local server like `npx serve` or Live Server extension for a better experience.

## Monorepo Structure
- `client/`: Frontend assets (UI/UX).
- `server/`: Express API & Database logic.

## Recent Changes
- [x] Initial PRD and Project Setup.
- [x] Backend initialization with MySQL.
- [x] JWT Authentication API (Signup, Login, Logout, Profile).
- [x] Apple-style minimalist frontend design.
- [x] Frontend-Backend Integration.
