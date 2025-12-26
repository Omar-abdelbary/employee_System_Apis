# Employee Management System

A robust RESTful API backend for managing organizational structures, including companies, departments, and employees. This system handles authentication, role-based access control, and hierarchical data management.

## 🚀 Features

- **Authentication & Authorization**: Secure user registration and login with JWT-based authentication and role-based access control (Admin, Manager, Employee).
- **Company Management**: Manage multiple companies with details like employee/department counts.
- **Department Management**: Organize companies into departments.
- **Employee Management**: Comprehensive employee profiles with workflow status tracking (e.g., Application Received -> Interview Scheduled -> Hired).
- **Validation**: Strict data validation using Joi.
- **Logging**: Request logging with Morgan and Winston.
- **Security**: Password hashing with BcryptJS.

## 🛠️ Technologies Used

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Token (JWT)](https://jwt.io/) & [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- **Validation**: [Joi](https://joi.dev/)
- **Testing**: [Jest](https://jestjs.io/) & [Supertest](https://www.npmjs.com/package/supertest)
- **Utilities**: [Dotenv](https://www.npmjs.com/package/dotenv), [Cors](https://www.npmjs.com/package/cors), [Nodemon](https://nodemon.io/)

## ⚙️ Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas connection string)

## 📥 Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd employee-management-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

## ▶️ Usage

### Running Locally

- **Development Mode** (with hot-reloading):
    ```bash
    npm run dev
    ```

- **Production Mode**:
    ```bash
    npm start
    ```

The server will start at `http://localhost:5000` (or your defined PORT).

### Running Tests

Execute the test suite using Jest:
```bash
npm test
```

## 📖 API Documentation

The API follows RESTful principles. Below is a high-level summary of the available resources.

**Base URL**: `/api`

| Resource | Description | Key Endpoints |
| :--- | :--- | :--- |
| **Auth** | User authentication | `POST /auth/register`, `POST /auth/login` |
| **Companies** | Company management | `GET`, `POST`, `PUT`, `DELETE /companies` |
| **Departments** | Department management | `GET`, `POST`, `PUT`, `DELETE /departments` |
| **Employees** | Employee profiles & workflow | `GET`, `POST`, `PUT`, `DELETE /employees` |

> 📚 **For detailed API documentation**, including request/response examples and authorization rules, please refer to [docs/api-docs.md](./docs/api-docs.md).
