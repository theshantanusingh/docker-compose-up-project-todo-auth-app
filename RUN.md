# How to Run

## 1. Setup Database
Create a MySQL database named `todo_auth_db`:
```sql
CREATE DATABASE todo_auth_db;
```

## 2. Server Configuration
- Open `server/.env`
- Update `DB_USER` and `DB_PASSWORD` with your MySQL credentials

## 3. Start Backend
```bash
cd server
npm install
node index.js
```

## 4. Launch Frontend
Open `client/index.html` in any web browser.
