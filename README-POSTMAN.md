# Migration Project API - Postman Collection

This directory contains a complete Postman collection and environment for testing the Migration Project API.

## Files Included

- `postman-collection.json` - Complete API collection with all endpoints
- `postman-environment.json` - Environment variables for the API
- `README-POSTMAN.md` - This instructions file

## API Overview

The Migration Project API is a Node.js/Express/MySQL REST API that provides:

### Base URL

- **Development**: `http://localhost:3000`

### Available Endpoints

#### Health Check

- `GET /ping` - Database connectivity test

#### Users Management

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Posts Management

- `GET /posts` - Get all posts (with pagination)
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## Import Instructions

### Method 1: Import Collection and Environment Separately

1. **Open Postman**

2. **Import the Collection:**

   - Click "Import" button (top left)
   - Select "Upload Files" tab
   - Choose `postman-collection.json`
   - Click "Import"

3. **Import the Environment:**

   - Click "Import" button again
   - Select "Upload Files" tab
   - Choose `postman-environment.json`
   - Click "Import"

4. **Select the Environment:**
   - In the top-right corner, select "Migration Project Environments" from the environment dropdown

### Method 2: Import via URL (if hosted)

If you have these files hosted somewhere, you can import directly via URL:

1. Click "Import" → "Link" tab
2. Enter the URL to the JSON file
3. Click "Continue" → "Import"

## Environment Variables

The collection uses the following variables (automatically set when you import the environment):

| Variable   | Default Value           | Description                |
| ---------- | ----------------------- | -------------------------- |
| `BASE_URL` | `http://localhost:3000` | API server base URL        |
| `USER_ID`  | `1`                     | Sample user ID for testing |
| `POST_ID`  | `1`                     | Sample post ID for testing |

### Customizing Environment Variables

You can modify these variables for different environments:

1. Click the "Environments" tab (left sidebar)
2. Select "Migration Project Environments"
3. Modify the values as needed:
   - For production: Change `BASE_URL` to your production URL
   - Update `USER_ID` and `POST_ID` with actual IDs from your database

## Usage Guide

### 1. Start Your Server

Make sure your Migration Project API server is running:

```bash
npm run dev  # or npm start
```

### 2. Test Database Connection

Run the "Ping Database" request first to ensure your API is accessible.

### 3. Create Test Data

Follow this suggested testing workflow:

1. **Create a User:**

   - Use "Create User" request
   - Note the returned user ID
   - Update the `USER_ID` environment variable if needed

2. **Create Posts:**

   - Use "Create Post" request
   - Use the user ID from step 1
   - Note the returned post ID

3. **Test All Endpoints:**
   - Get all users/posts
   - Get specific users/posts by ID
   - Update existing records
   - Delete records

### 4. Working with Pagination

The "Get All Posts" endpoint supports pagination:

- `page` parameter (default: 1)
- `limit` parameter (1-100, default: 10)

Example: `GET /posts?page=2&limit=5`

## Request/Response Examples

### User Creation

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "User created successfully",
  "data": { "id": 1 },
  "error": null
}
```

### Post Creation

**Request:**

```json
{
  "user_id": 1,
  "title": "My First Post",
  "content": "This is the content of my post..."
}
```

**Response:**

```json
{
  "message": "Post created successfully",
  "data": { "id": 1 },
  "error": null
}
```

### Error Response Example

```json
{
  "message": "Missing required fields",
  "data": null,
  "error": "name and email are required"
}
```

## Response Format

All API responses follow this consistent format:

```json
{
  "message": "Descriptive message",
  "data": "Actual response data or null",
  "error": "Error message or null",
  "pagination": "Only for paginated responses"
}
```

## Testing Tips

1. **Use the Collection Variables:** Update `USER_ID` and `POST_ID` variables as you create new records
2. **Check Response Status Codes:** Each request includes example responses for success and error scenarios
3. **Test Error Cases:** Try sending incomplete data to test validation
4. **Test Pagination:** Use different page/limit combinations for the posts endpoint
5. **Sequence Testing:** Create users first, then posts referencing those users

## Common Issues

### Connection Refused

- Ensure your API server is running on the correct port
- Verify the `BASE_URL` environment variable matches your server

### 404 Errors

- Check that you're using valid IDs that exist in your database
- Update the `USER_ID` and `POST_ID` variables with actual IDs

### Validation Errors

- Ensure all required fields are provided in request bodies
- Check that email formats are valid for user creation

## Development Notes

- The API uses MySQL database with auto-incrementing IDs
- All timestamps are automatically managed by the database
- User emails should be unique (depending on your database schema)
- Posts are linked to users via `user_id` foreign key

## Support

If you encounter any issues:

1. Check the API server logs
2. Verify database connectivity using the `/ping` endpoint
3. Ensure all required environment variables are set
4. Check that the MySQL database is running and accessible

---

**Happy Testing!** 🚀
