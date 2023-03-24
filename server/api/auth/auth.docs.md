# API Documentation for Authentication Routes

This documentation outlines the API endpoints for authentication using JSON Web Tokens (JWT).

### POST /api/auth/register

Request Body
The request body should contain the following fields:

email (required): the user's email address
password (required): the user's password
username (optional): the user's username
firstName (optional): the user's first name
lastName (optional): the user's last name
Response
On successful registration, the server responds with a JSON object containing:

accessToken: a JWT access token
refreshToken: a JWT refresh token

/api/auth/login

This endpoint is used for user login.

Route
bash
Copy code

### POST /api/auth/login

Request Body
The request body should contain the following fields:

username (required): the user's username or email address
password (required): the user's password
Response
On successful login, the server responds with a JSON object containing:

accessToken: a JWT access token
refreshToken: a JWT refresh token
/api/auth/refreshToken
This endpoint is used for refreshing an expired JWT access token.

Route
bash
Copy code

### POST /api/auth/refreshToken

Request Body
The request body should contain the following fields:

refreshToken (required): the user's refresh token
Response
On successful refresh, the server responds with a JSON object containing:

accessToken: a new JWT access token
refreshToken: a new JWT refresh token

### /api/auth/revokeRefreshTokens

This endpoint is used for revoking all refresh tokens for a given user.

Route
bash
Copy code

### POST /api/auth/

Request Body
The request body should contain the following fields:

userId (required): the user's ID
Response
On successful revocation, the server responds with a JSON object containing:

message: a confirmation message
