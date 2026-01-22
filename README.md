# Multi-Tenant Organization Workspace API

The backend API built with **Node.js, Express, TypeScript, MongoDB, and Mongoose**.
This project handles **authentication, user management, and organization management** with **role-based access control (RBAC)**.

---

## Project Overview

This is a backend REST API for managing multiple organizations in a single platform.

Each organization has:

* Its own users
* Its own projects
* Its own tasks

Data is strictly isolated between organizations. One organization cannot access another organization’s data.

---

## Why MongoDB?

MongoDB was chosen because:

* It is schema-flexible and easy to evolve
* Works very well with Node.js applications
* Mongoose provides strong validation and relationships
* Suitable for fast development and real-world SaaS systems

MongoDB allows us to model organizations, users, projects, and tasks cleanly while maintaining data isolation.

---

## Main Entities

### 1️⃣ User

Represents a person who can log in and use the system.

Roles:

* `PLATFORM_ADMIN` → Can manage organizations
* `ORGANIZATION_ADMIN` → Can manage users, projects, and tasks inside their organization
* `ORGANIZATION_MEMBER` → Can access only assigned tasks

### 2️⃣ Organization

Represents a company / team / group.

* Created only by `PLATFORM_ADMIN`
* Identified by a unique **slug**
* Fully isolated from other organizations

### 3️⃣ Project

Represents work or initiatives inside an organization.

* Belongs to **one organization only**
* Created and managed by `ORGANIZATION_ADMIN`
* Used to group related tasks

### 4️⃣ Task

Represents an individual unit of work.

* Belongs to a **project**
* Automatically scoped to an organization via project
* Can be assigned only to users of the same organization
* Members can see **only tasks assigned to them**

---

## Authentication & Authorization

### Authentication

* Email & Password login
* Passwords are hashed using **bcrypt**
* Login returns **Access Token** and **Refresh Token**

### Authorization

* Implemented using **JWT + Role Based Access Control**
* `checkAuth` middleware verifies:

  * Token validity
  * User role permission

---

## Token & Cookie Flow

* Access Token → short-lived (used for API requests)
* Refresh Token → long-lived (used to get new access token)
* Tokens are sent via **HTTP-only cookies**

---

## Organization Rules

* Only `PLATFORM_ADMIN` can:

  * Create organization
  * View all organizations

* Organization name is converted to a **slug** using `slugify`

* Slug ensures:

  * Clean URLs
  * Unique organization identity

* Organization data is completely isolated

---

## User Rules

* Platform Admin:

  * Can create organizations
  * Does **not** belong to any organization

* Organization Admin:

  * Belongs to one organization
  * Can create users inside the same organization
  * Can manage projects and tasks

* Organization Member:

  * Belongs to one organization
  * Can view only assigned tasks

---

## Validation

* Request validation is done using **Zod**
* Prevents:

  * Invalid data
  * Missing required fields
  * Wrong data types

---

## Base URL

```
https://multi-tenant-organization-workspace.vercel.app/api/v1
```

---

## Authentication

* Login using **email & password**
* JWT-based authentication
* Access token is already configured in Postman collection
* No manual token setup needed

---

## Roles

* PLATFORM_ADMIN
* ORGANIZATION_ADMIN
* ORGANIZATION_MEMBER

---

## API Endpoints

### Auth

* POST /auth/login
* POST /auth/refresh-token
* POST /auth/logout

### User

* POST /user/register-organization-admin
  → Platform Admin only

* POST /user/register-organization-member
  → Organization Admin only

* GET /user/all-users

* GET /user/me

* GET /user/:id

* PATCH /user/:id

### Organization

* POST /organizations
* GET /organizations
* GET /organizations/:id
* PATCH /organizations/:id
* DELETE /organizations/:id

### Project

* POST /projects
* GET /projects
* PATCH /projects/:id
* DELETE /projects/:id

### Task

* POST /tasks
* GET /tasks
* GET /tasks/:id
* PATCH /tasks/:id
* DELETE /tasks/:id

---

## Folder Structure (Simplified)

```
src/
 ├─ modules/
 │   ├─ auth/
 │   ├─ user/
 │   ├─ organization/
 │   ├─ project/
 │   └─ task/
 ├─ middlewares/
 ├─ utils/
 ├─ config/
 └─ app.ts
```

---

## API Flow Example

1. Platform Admin logs in
2. Platform Admin creates an organization
3. Platform Admin creates Organization Admin with organizationId
4. Organization Admin creates Organization Member
5. Organization Admin creates projects
6. Organization Admin creates tasks under projects
7. Tasks are assigned to organization members
8. Members access only their assigned tasks

---

## Testing

* APIs tested using **Postman**
* Ready-to-use JSON bodies for:

  * Login
  * Create user
  * Create organization

---

## Technologies Used

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Zod

---

## Key Features

* Secure authentication
* Role-based authorization
* Clean architecture (Controller → Service → Model)
* Scalable and maintainable structure

