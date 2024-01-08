# cleanwalk-v2-api


# install:
require python3
```
pip install -r requirements.txt
```

# launch the api:

```
py app.py
```

or use the python extention and play on app.py

# test the api:
go to the rotes /cleanwalks or /users

# API Routes Documentation - Users

## Authentication

### 1. [POST] /users/login

- **Description:** Log in by providing a valid email and password.
- **Example:**
{
  "email": "frin.arthur@gmail.com",
  "password": "azerty"
}

### 2. [POST] /users/token-login

- **Description:** Log in using a valid JWT token.
- **Note:** Requires adding the JWT token to the request headers (bearer token).

## Users

### 3. [GET] /users/:user_id

- **Description:** Retrieve details of a specific user by providing their ID.
- **Note:** Requires adding the JWT token to the request headers to access this route.

### 4. [GET] /users

- **Description:** Retrieve all registered users.
- **Note:** Requires adding the JWT token to the request headers to access this route.

### 5. [POST] /users

- **Description:** Create a new user by providing the required information.
- **Example:**
{
  "firstname": "Arthur",
  "lastname": "Frin",
  "email": "frin.arthur@gmail.com",
  "password": "azerty",
  "profile_picture": "image_url",
  "role_id": 1
}

### 6. [DELETE] /users/:user_id

- **Description:** Delete a specific user by providing their ID.
- **Note:** Requires adding the JWT token to the request headers to access this route.

### 7. [PUT] /users/:user_id

- **Description:** Update information for a specific user by providing their ID.
- **Example:**
{
  "firstname": "New first name",
  "lastname": "New last name",
  "email": "new.email@example.com",
  "profile_picture": "new_image_url"
}
