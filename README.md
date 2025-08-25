# Automaze To-Do App

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Frontend: Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js)
![Backend: NestJS](https://img.shields.io/badge/Backend-NestJS-red?logo=nestjs)
![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![Styling: TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-cyan?logo=tailwindcss)

A modern and feature-rich To-Do manager built as a full-stack application. The frontend is developed with **Next.js** and **React**, while the backend is powered by **NestJS** and a **PostgreSQL** database.

---

### 🎥 Demo

*(A screenshot or a short GIF of the application in action would be a great addition here)*

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation and Setup](#️-installation-and-setup)
    - [1. Database Setup (PostgreSQL)](#1-database-setup-postgresql)
    - [2. Backend Setup (NestJS)](#2-backend-setup-nestjs)
    - [3. Frontend Setup (Next.js)](#3-frontend-setup-next.js)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Author](#-author)

---

## ✨ Key Features

- **Full CRUD for Tasks:** Create, Read, Update, and Delete tasks seamlessly.
- **Responsive Design:** The interface is optimized for both desktop and mobile devices.
- **Interactive UI:**
    - **Collapsible Sidebar:** For easy navigation and task filtering.
    - **Task Details Modal:** Click a task to open a side panel for detailed editing (title, description, status).
    - **Toggle Behavior:** Clicking an already selected task closes the details modal.
    - **Quick-Complete:** Mark tasks as done directly from the main list.
- **Advanced Filtering and Sorting:**
    - Search tasks by title.
    - Filter by status (All, Done, Undone).
    - Sort by priority (Ascending or Descending).
- **Personalization:**
    - **Background Switcher:** Users can choose from several background colors and gradients.
    - **State Persistence:** The chosen background is saved in `localStorage` and persists across sessions.
- **Task Counters:** The sidebar displays the total number of tasks, updating in real-time.

---

## 🚀 Technology Stack

- **Frontend:**
    - **Framework:** [Next.js](https://nextjs.org/) 14+ (using App Router)
    - **Library:** [React](https://reactjs.org/) 18+
    - **Language:** [TypeScript](https://www.typescriptlang.org/)
    - **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    - **API Client:** Native `fetch`
- **Backend:**
    - **Framework:** [NestJS](https://nestjs.com/)
    - **Language:** [TypeScript](https://www.typescriptlang.org/)
    - **ORM:** [TypeORM](https://typeorm.io/)
    - **Database:** [PostgreSQL](https://www.postgresql.org/)
    - **Validation:** `class-validator`, `class-transformer`
    - **API Documentation:** [Swagger (OpenAPI)](https://swagger.io/)

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or another package manager like [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/download/) installed locally or access to a database instance.

---

## ⚙️ Installation and Setup

### 1. Database Setup (PostgreSQL)

1.  Ensure your PostgreSQL server is running.
2.  Create a new database. By default, the project expects a database named `to-do`.
    ```sql
    CREATE DATABASE "to-do";
    ```
3.  Verify the connection details in the `backend/environments/local.env` file. The default configuration is:
    - **Host:** `localhost`
    - **Port:** `5433`
    - **User:** `postgres`
    - **Password:** `userpass`
    - **Database Name:** `to-do`

    *Note: If your local database credentials differ, please update them in the `local.env` file.*

### 2. Backend Setup (NestJS)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run database migrations** to create the necessary tables:
    ```bash
    npm run migration:run
    ```

4.  **Start the development server:**
    ```bash
    npm run start:dev
    ```

The backend server will be running on `http://localhost:5000`.

### 3. Frontend Setup (Next.js)

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## 📁 Project Structure

The project is organized as a monorepo with two main directories for the frontend and backend.

```
/
├── backend/      # NestJS Application (Server)
│   ├── src/
│   │   ├── modules/    # Core feature modules (tasks, etc.)
│   │   ├── database/   # TypeORM entities and migrations
│   │   └── ...
│   └── package.json
│
└── frontend/     # Next.js Application (Client)
    ├── src/
    │   ├── app/        # Pages and layouts (App Router)
    │   ├── components/ # Reusable React components
    │   ├── lib/        # API client logic
    │   └── ...
    └── package.json
```

---

## 📚 API Documentation

Once the backend server is running, interactive API documentation (powered by Swagger) is available at:

[**http://localhost:5000/docs**](http://localhost:5000/docs)

---

## 👨‍💻 Author

- **ivan-andriichak**

