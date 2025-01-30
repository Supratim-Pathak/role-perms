# Role Controller Test Cases

## Setup

1. Install dependencies:
   ```sh
   npm install chai chai-http mocha
   ```
2. Ensure your test database is running.
3. Run the tests:
   ```sh
   npm test
   ```

## Test Cases

### 1. Create a New Role
**Endpoint:** `POST /roles`
- **Request Body:**
  ```json
  {
    "name": "Admin",
    "permissions": []
  }
  ```
- **Expected Response:**
  ```json
  {
    "_id": "roleId",
    "name": "Admin",
    "permissions": []
  }
  ```
- **Status Code:** `201 Created`

### 2. Retrieve All Roles
**Endpoint:** `GET /roles`
- **Expected Response:** Array of roles
- **Status Code:** `200 OK`

### 3. Retrieve a Single Role
**Endpoint:** `GET /roles/:id`
- **Expected Response:**
  ```json
  {
    "_id": "roleId",
    "name": "Admin",
    "permissions": []
  }
  ```
- **Status Code:** `200 OK`

### 4. Update a Role
**Endpoint:** `PUT /roles/:id`
- **Request Body:**
  ```json
  {
    "name": "Super Admin"
  }
  ```
- **Expected Response:**
  ```json
  {
    "_id": "roleId",
    "name": "Super Admin",
    "permissions": []
  }
  ```
- **Status Code:** `200 OK`

### 5. Assign Permission to Role
**Endpoint:** `POST /roles/:id/assign-permission`
- **Request Body:**
  ```json
  {
    "permissionId": "permId"
  }
  ```
- **Status Code:** `200 OK`

### 6. Revoke Permission from Role
**Endpoint:** `POST /roles/:id/revoke-permission`
- **Request Body:**
  ```json
  {
    "permissionId": "permId"
  }
  ```
- **Status Code:** `200 OK`

### 7. Delete a Role
**Endpoint:** `DELETE /roles/:id`
- **Status Code:** `200 OK`
