# 🎓 Student Management System (NestJS)

A backend system for managing students, teachers, subjects, scores, and schedules built with NestJS, TypeScript, and TypeORM.  
This project follows a modular architecture and provides RESTful APIs for authentication and school management features.

---

## 📌 Features

- User authentication & authorization (JWT)
- Student management (CRUD)
- Teacher management (CRUD)
- Subject management (CRUD)
- Score management
- Class & schedule management
- Redis integration
- Modular architecture (NestJS modules)
- Input validation & error handling
- RESTful API design

---

## 🛠 Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** MySQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Cache:** Redis
- **Tools:** Git, Postman

---

## 📁 Project Structure

```
src/
├── commons/ # Shared common logic (decorators, guards, pipes, interceptors)
│ ├── decorators/ # Custom decorators
│ ├── enums/ # Enum definitions
│ ├── exceptions/ # Custom exception handlers
│ ├── guards/ # Auth & role guards
│ ├── interceptors/ # Request/response interceptors
│ └── pipes/ # Validation & transform pipes
├── constants/ # Application constants
├── database/ # Database configuration
│ ├── entities/ # TypeORM entities
│ ├── migrations/ # Database migrations
│ ├── datasource.ts # TypeORM datasource config
│ └── typeorm.config.ts # TypeORM connection config
├── modules/ # Feature modules
│ ├── accounts
│ ├── auth
│ ├── redis
│ ├── room
│ ├── schedule
│ ├── score
│ ├── student
│ ├── subject
│ └── teacher
├── app.controller.ts # Root controller
├── app.module.ts # Root application module
├── app.service.ts # Root service
├── main.ts # Application entry point
└── test/ # Testing files
.env.example # Environment variable example
nest-cli.json # NestJS CLI configuration
package.json
README.md
tsconfig.json # TypeScript configuration
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/TanHuy2k2/student-management.git
cd student-management
npm install
🔑 Environment Variables

Create a .env file based on .env.example:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=student_management
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3000

▶️ Run the Project
npm run start:dev

Server runs at:

http://localhost:3000
🗄 Database Migration

Run migrations:

npm run migrate:up

Generate migration:

npm run migrate:generate

Revert migration:

npm run migrate:down
🎯 Project Purpose

This project is built for learning and practicing:

NestJS backend development

Modular architecture

Authentication & authorization

Database design with TypeORM

RESTful API best practices

👨‍💻 Author

Nguyen Tan Huy
GitHub: https://github.com/TanHuy2k2
Email: tanhuyqn6789@gmail.com
```
