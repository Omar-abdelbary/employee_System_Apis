# Employee Management System API Documentation

Base URL: `http://localhost:5000`

## Authentication

### Register User
Create a new user account.

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Auth**: Public
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "userName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Admin" 
  }
  ```
  *Note: Role can be 'Admin', 'Manager', or 'Employee'. Default is 'Employee'.*

- **Success Response (201 Created)**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "userName": "John Doe",
    "email": "john@example.com",
    "role": "Admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### Login User
Authenticate a user and get a token.

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth**: Public
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Success Response (200 OK)**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "userName": "John Doe",
    "email": "john@example.com",
    "role": "Admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```
- **Error Response (401 Unauthorized)**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## Companies

### Get All Companies
Retrieve a list of all companies.

- **URL**: `/api/companies`
- **Method**: `GET`
- **Auth**: Bearer Token (Any Role)
- **Success Response (200 OK)**:
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "companyName": "Tech Corp",
      "numberOfDepartments": 2,
      "numberOfEmployees": 10
    }
  ]
  ```

### Create Company
Create a new company.

- **URL**: `/api/companies`
- **Method**: `POST`
- **Auth**: Bearer Token (Admin only)
- **Body**:
  ```json
  {
    "companyName": "Tech Corp"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109cb",
    "companyName": "Tech Corp",
    "numberOfDepartments": 0,
    "numberOfEmployees": 0
  }
  ```

### Get Single Company
- **URL**: `/api/companies/:id`
- **Method**: `GET`
- **Auth**: Bearer Token (Any Role)
- **Success Response (200 OK)**:
  ```json
  {
      "_id": "60d0fe4f5311236168a109cb",
      "companyName": "Tech Corp",
      ...
  }
  ```

### Update Company
- **URL**: `/api/companies/:id`
- **Method**: `PUT`
- **Auth**: Bearer Token (Admin only)
- **Body**:
  ```json
  {
    "companyName": "New Tech Corp Name"
  }
  ```

### Delete Company
- **URL**: `/api/companies/:id`
- **Method**: `DELETE`
- **Auth**: Bearer Token (Admin only)
- **Note**: Cannot delete if company has active departments or employees.

---

## Departments

### Get All Departments
- **URL**: `/api/departments`
- **Method**: `GET`
- **Auth**: Bearer Token (Any Role)

### Create Department
- **URL**: `/api/departments`
- **Method**: `POST`
- **Auth**: Bearer Token (Admin, Manager)
- **Body**:
  ```json
  {
    "company": "60d0fe4f5311236168a109cb",
    "departmentName": "Engineering"
  }
  ```

### Get Single Department
- **URL**: `/api/departments/:id`
- **Method**: `GET`
- **Auth**: Bearer Token (Any Role)

### Update Department
- **URL**: `/api/departments/:id`
- **Method**: `PUT`
- **Auth**: Bearer Token (Admin, Manager)
- **Body**:
  ```json
  {
    "departmentName": "R&D"
  }
  ```

### Delete Department
- **URL**: `/api/departments/:id`
- **Method**: `DELETE`
- **Auth**: Bearer Token (Admin only)
- **Note**: Cannot delete if department has active employees.

---

## Employees

### Get All Employees
- **URL**: `/api/employees`
- **Method**: `GET`
- **Auth**: Bearer Token (Any Role)

### Create Employee
Create a new employee application.

- **URL**: `/api/employees`
- **Method**: `POST`
- **Auth**: Bearer Token (Admin, Manager)
- **Body**:
  ```json
  {
    "company": "60d0fe4f5311236168a109cb",
    "department": "60d0fe4f5311236168a109cc",
    "employeeName": "Jane Smith",
    "email": "jane@techcorp.com",
    "mobileNumber": "1234567890",
    "address": "123 Main St",
    "designation": "Software Engineer"
  }
  ```

### Get Single Employee
- **URL**: `/api/employees/:id`
- **Method**: `GET`
- **Auth**: Bearer Token (Any Role)

### Update Employee
Update details or change status (Workflow).

- **URL**: `/api/employees/:id`
- **Method**: `PUT`
- **Auth**: Bearer Token (Admin, Manager)
- **Body Example (Workflow Transition)**:
  ```json
  {
    "employeeStatus": "Interview Scheduled"
  }
  ```
  *Allowed Transitions:*
  - `Application Received` -> `Interview Scheduled` or `Not Accepted`
  - `Interview Scheduled` -> `Hired` or `Not Accepted`

### Delete Employee
- **URL**: `/api/employees/:id`
- **Method**: `DELETE`
- **Auth**: Bearer Token (Admin only)
