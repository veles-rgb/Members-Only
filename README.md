# Members Only

A simple message board application built as part of The Odin Project curriculum.
Users can register, log in, post messages, and view additional information based on
membership status. Administrators can moderate content.

You can view the live link here: [Club Veles](https://members-only-production-95ef.up.railway.app/)

## Features

- User authentication with Passport.js (Local Strategy)
- Secure password hashing with bcrypt
- Session storage using PostgreSQL (connect-pg-simple)
- Role-based access:
  - Guests: limited message visibility
  - Members: full message details
  - Admins: message deletion
- Server-side rendering with EJS
- Input validation using express-validator
- Persistent data storage with PostgreSQL
- Responsive UI using Skeleton CSS
- Sticky footer across all pages
- Custom 404 page

---

- Added user profiles and admin panel pages for fun. Not part of the project.

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- Passport.js
- bcrypt
- express-session
- connect-pg-simple

### Frontend

- EJS
- Skeleton CSS
- Normalize.css
- Custom CSS

### Deployment

- [Railway](https://neon.com/) (Node)
- [Neon](https://railway.com/) (PostgreSQL)

## Database Schema

### Users Table

- id
- name
- username (unique)
- password_hash
- is_member
- is_admin
- created_at

### Messages Table

- id
- title (max 50 characters)
- message (max 2000 characters)
- timestamp
- user_id (foreign key → users.id, ON DELETE CASCADE)

### Session Table

- Express-sessions default

## Access Control

| Role   | View Messages | See Author & Time | Post Messages | Delete Messages |
| ------ | ------------- | ----------------- | ------------- | --------------- |
| Guest  | Yes           | No                | No            | No              |
| Member | Yes           | Yes               | Yes           | No              |
| Admin  | Yes           | Yes               | Yes           | Yes             |

## Author

Created by VelesRGB  
For [The Odin Project](https://www.theodinproject.com/) — [Members Only](https://www.theodinproject.com/lessons/node-path-nodejs-members-only)

Repository:
https://github.com/veles-rgb/Members-Only
