# Role-Permission Package

[![npm version](https://img.shields.io/npm/v/role-permission.svg)](https://www.npmjs.com/package/role-permission)
[![License](https://img.shields.io/github/license/yourusername/role-permission.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/role-permission/tests.yml)](https://github.com/yourusername/role-permission/actions)

A **role-based access control (RBAC)** system for Node.js applications using **MongoDB**. This package helps manage users, roles, and permissions efficiently.

The role-permission package is a Role-Based Access Control (RBAC) system for Node.js applications using MongoDB. It allows developers to manage users, roles, and permissions efficiently. With this package, you can define permissions, assign them to roles, and associate roles with users. It includes a built-in authorization middleware to protect API routes based on assigned permissions. The package is lightweight, flexible, and easy to integrate into any Express.js or Node.js project. It supports multi-role users and dynamic permission checks for fine-grained access control. Using Mongoose, it ensures data is stored efficiently in MongoDB. The API is simple yet powerful, making it easy to implement secure role-based authentication. Ideal for SaaS applications, admin dashboards, and enterprise software. 

---

## 🚀 Features
- 🔒 Assign roles and permissions to users.
- ✅ Middleware for role-based authorization.
- 📌 Flexible and easy-to-use API.
- 🔗 MongoDB integration.

---

## 📦 Installation

### **Using npm**
```bash
npm install max-rbac
```

# Use with express

This section provides a structured approach to setting up an Express.js application with role-based permissions using the `max-rbac` package.

## Setting Up an Express Application

Follow the steps below to create a basic Express application:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const { User, init, Permission, Role } = require("role-permission");

const app = express();
const port = 3000;

app.listen(port, async () => {
  init("mongodb://127.0.0.1:27017/{{Your_collection_name}}"); // Connect the package codebase with database 
  await mongoose.connect("mongodb://127.0.0.1:27017/{{Your_collection_name}}");
  console.log(`Server is running on port ${port}`);
});
```
---

## Importing the user Module

```javascript
const {
  createUser,
  deleteUser,
  updateUser,
  getAllUser,
  getOneUser,
  can,
  searchUser
} = require("role-permissions");
```

---

## User Model

This package uses a Mongoose model to manage users.

### Schema Definition

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: { type: String, trim: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null },
  },
  { timestamps: true }
);

// Middleware to handle password hashing before saving
userSchema.pre("save", async function (next) {
  if (this.first_name) this.first_name = this.first_name.trim();
  if (this.last_name) this.last_name = this.last_name.trim();
  if (this.email) this.email = this.email.trim().toLowerCase();
  
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password.trim(), salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
```
### Create user
```
const userInfo = await User.createUser("first_name", "last_name", "supratimpathak@gmail.com", "password123")
```
### Features
- **Password Hashing:** Uses **bcrypt** to securely hash passwords before saving to the database.
- **Role Association:** Associates each user with a role using a reference to the Role model.
- **Pagination Support:** Integrates mongoose-paginate-v2 for easy pagination of user data.
- **Automatic Trimming:** Ensures that names and email addresses are properly formatted.

### Description
- **first_name** (*String*): The first name of the user.
- **last_name** (*String*): The last name of the user.
- **email** (*String*): The unique email of the user.
- **password** (*String*): The user's hashed password.
- **role** (*ObjectId*): References a role from the `Role` model.
- **timestamps**: Automatically adds createdAt and updatedAt fields.
- **Pagination Plugin**: `mongoose-paginate-v2` is used to enable pagination.

---

## User Functions

### Create a User

**Description:** Creates a new user.

```javascript
const newUser = await createUser("John", "Doe", "john@example.com", "securepassword");
console.log(newUser);
```

### Delete a User

**Description:** Deletes a user by ID.

```javascript
const deletedUser = await deleteUser("507f1f77bcf86cd799439011");
console.log(deletedUser);
```

### Update a User

**Description:** Updates an existing user's details.

```javascript
const updatedUser = await updateUser(
  "507f1f77bcf86cd799439011",
  "John",
  "Smith",
  "johnsmith@example.com",
  "newsecurepassword"
);
console.log(updatedUser);
```

### Get All Users

**Description:** Retrieves a paginated list of all users.

```javascript
const users = await getAllUser(1, 10);
console.log(users);
```

### Get One User

**Description:** Retrieves a single user by ID.

```javascript
const user = await getOneUser("507f1f77bcf86cd799439011");
console.log(user);
```

### Check User Permission

**Description:** Checks if a user has a specific permission.

```javascript
const hasPermission = await can("507f1f77bcf86cd799439011", "edit_user");
console.log(hasPermission);
```

### Search Users

**Description:** Searches for users based on a query string.

```javascript
const searchResults = await searchUser("john", 1, 5);
console.log(searchResults);
```

---

## Importing the role Module

```javascript
const {
  createRole,
  deleteRole,
  updateRole,
  getAllRole,
  getOneRole,
  assignRole,
  revokeRole,
  rolesPermission,
  searchRole
} = require("role-permissions");
```

---

## Role Model

This package uses a Mongoose model to manage roles.

### Schema Definition

```javascript
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

roleSchema.plugin(mongoosePaginate);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
```

### Description
- **name** (*String*): The unique name of the role.
- **permissions** (*Array<ObjectId>*): References multiple permissions from the `Permission` model.
- **timestamps**: Automatically adds createdAt and updatedAt fields.
- **Pagination Plugin**: `mongoose-paginate-v2` is used to enable pagination.

---

## Role Functions

### Create a Role

**Description:** Creates a new role with permissions.

```javascript
const newRole = await createRole("Admin", ["60d21b4667d0d8992e610c85"]);
console.log(newRole);
```

### Delete a Role

**Description:** Deletes a role by ID.

```javascript
const deletedRole = await deleteRole("60d21b4667d0d8992e610c85");
console.log(deletedRole);
```

### Update a Role

**Description:** Updates an existing role's name and permissions.

```javascript
const updatedRole = await updateRole(
  "60d21b4667d0d8992e610c85",
  "Super Admin",
  ["60d21b4667d0d8992e610c86"]
);
console.log(updatedRole);
```

### Get All Roles

**Description:** Retrieves a paginated list of all roles.

```javascript
const roles = await getAllRole(1, 10);
console.log(roles);
```

### Get One Role

**Description:** Retrieves a single role by ID.

```javascript
const role = await getOneRole("60d21b4667d0d8992e610c85");
console.log(role);
```

### Assign Role to User

**Description:** Assigns a role to a user.

```javascript
const assignedRole = await assignRole("507f1f77bcf86cd799439011", "60d21b4667d0d8992e610c85");
console.log(assignedRole);
```

### Revoke Role from User

**Description:** Removes a role from a user.

```javascript
const revokedRole = await revokeRole("507f1f77bcf86cd799439011");
console.log(revokedRole);
```

### Get Role Permissions

**Description:** Retrieves the permissions assigned to a specific role.

```javascript
const rolePermissions = await rolesPermission("60d21b4667d0d8992e610c85");
console.log(rolePermissions);
```

### Search Roles

**Description:** Searches for roles based on a query string.

```javascript
const searchResults = await searchRole("admin", 1, 5);
console.log(searchResults);
```
---
## Importing the Permission Module

```javascript
const {
  createPermission,
  deletePermission,
  updatePermission,
  getAllPermission,
  getOnePermission,
  searchPermission
} = require("role-permissions");
```

---

## Permission Model

This package uses a Mongoose model to manage permissions.

### Schema Definition

```javascript
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    module: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

permissionSchema.plugin(mongoosePaginate);

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
```

### Description
- **name** (*String*): The unique name of the permission.
- **description** (*String*): A brief description of the permission.
- **module** (*String*): The module this permission belongs to.
- **timestamps**: Automatically adds createdAt and updatedAt fields.
- **Pagination Plugin**: `mongoose-paginate-v2` is used to enable pagination.

---

## Permission Functions

### Create a Permission

**Description:** Creates a new permission.

```javascript
const newPermission = await createPermission("read_users", "Can read user data", "User Management");
console.log(newPermission);
```

### Delete a Permission

**Description:** Deletes a permission by ID.

```javascript
const deletedPermission = await deletePermission("60d21b4667d0d8992e610c85");
console.log(deletedPermission);
```

### Update a Permission

**Description:** Updates an existing permission.

```javascript
const updatedPermission = await updatePermission(
  "60d21b4667d0d8992e610c85",
  "write_users",
  "Can modify user data",
  "User Management"
);
console.log(updatedPermission);
```

### Get All Permissions

**Description:** Retrieves a paginated list of all permissions.

```javascript
const permissions = await getAllPermission(1, 10);
console.log(permissions);
```

### Get One Permission

**Description:** Retrieves a single permission by ID.

```javascript
const permission = await getOnePermission("60d21b4667d0d8992e610c85");
console.log(permission);
```

### Search Permissions

**Description:** Searches for permissions based on a query string.

```javascript
const searchResults = await searchPermission("read", 1, 5);
console.log(searchResults);
```

---

## License

MIT License




