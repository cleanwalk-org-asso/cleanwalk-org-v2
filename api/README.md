
# cleanwalk-v2-api

## Install:
require python3
pip install -r requirements.txt

## Launch the API:
py app.py
or use the Python extension and play on app.py

## Test the API:
Go to the routes /cleanwalks or /users

# API Routes Documentation - Users

## Authentication

### 1. [POST] Login
- **Route:**
```bash
/users/login

- **Description:** Log in by providing a valid email and password.

- **Example:**
```json
{
  "email": "frin.arthur@gmail.com",
  "password": "azerty"
}
```

### 2. [POST] Token Login
- **Route:**
```bash
/users/token-login
```

- **Description:** Log in using a valid JWT token (obtained from the login route).
- **Note:** Requires adding the JWT token to the request headers (bearer token). 

## Users

### 3. [GET] Get User by ID
- **Route:**
```bash
/users/:user_id
```

- **Description:** Retrieve details of a specific user by providing their ID.
- **Note:** Requires adding the JWT token to the request headers to access this route.

### 4. [GET] Get All Users
- **Route:**
```bash
/users
```
- **Description:** Retrieve all registered users.
- **Note:** Requires adding the JWT token to the request headers to access this route.

### 5. [POST] User Creation
- **Route:**
```bash
/users
```
- **Description:** Create a new user by providing the required information.
- **Example:**
- **Note:** role_id: 1 == user | 2 == organisation
```json
{
  "firstname": "Arthur",
  "lastname": "Frin",
  "email": "frin.arthur@gmail.com",
  "password": "azerty",
  "profile_picture": "image_url",
  "role_id": 1
}
```

### 6. [DELETE] Delete User by ID
- **Route:**
```bash
/users/:user_id
```
- **Description:** Delete a specific user by providing their ID.
- **Note:** Requires adding the JWT token to the request headers to access this route.

### 7. [PUT] Update User by ID
- **Route:**
```bash
/users/:user_id
```
- **Description:** Update information for a specific user by providing their ID.
- **Example:**
```json
{
  "firstname": "New first name",
  "lastname": "New last name",
  "email": "new.email@example.com",
  "profile_picture": "new_image_url"
}
```