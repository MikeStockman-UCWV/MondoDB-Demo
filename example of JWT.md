example of JWT

Here’s a simple example of how to use JSON Web Tokens (JWT) to authenticate users. 

### Step-by-Step Walkthrough for JWT Authentication

#### Step 1: Set Up Node.js Project

First, create a Node.js project and install the necessary packages.

```bash
mkdir jwt-demo
cd jwt-demo
npm init -y
npm install express jsonwebtoken bcryptjs
```

**Explanation of Packages:**
- `express`: For creating a simple API.
- `jsonwebtoken`: To generate and verify JWT tokens.
- `bcryptjs`: For hashing passwords (you can explain why hashing is important for security).

#### Step 2: Create `server.js` File

In your project folder, create a `server.js` file.

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json()); // Middleware to parse JSON

const users = []; // Simulated user data

// Secret key for JWT
const JWT_SECRET = 'your-secret-key'; // Use environment variables in production!

// Register Route (Create a new user)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  users.push({ username, password: hashedPassword });
  res.json({ message: 'User registered successfully' });
});

// Login Route (Authenticate and generate JWT)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check password validity
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// Protected Route (Requires a valid JWT token)
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to your dashboard` });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = verified; // Attach user data to the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Step 3: How the Flow Works

1. **Register a User**
   - The user sends their `username` and `password` to the `/register` endpoint.
   - The server hashes the password using `bcrypt` and stores it in the `users` array.

2. **Login the User**
   - The user sends their credentials to the `/login` endpoint.
   - The server checks the password, and if valid, generates a JWT using `jsonwebtoken`.
   - The token is returned to the user.

3. **Access a Protected Route**
   - The user must include the token in the `Authorization` header to access the `/dashboard` route.
   - The server verifies the token and allows access to the protected route.

### Example of Requests:

- **Register a User (POST /register)**

```json
{
  "username": "john",
  "password": "password123"
}
```

- **Login (POST /login)**

```json
{
  "username": "john",
  "password": "password123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "your-jwt-token"
}
```

- **Access Protected Route (GET /dashboard)**
  
Send a request with the token in the `Authorization` header:

```
Authorization: Bearer your-jwt-token
```

Response:

```json
{
  "message": "Welcome john to your dashboard"
}
```

### Additional Discussion Points:
- Why tokens are stored on the client side (e.g., localStorage, cookies).
- Why tokens should have an expiration time (`expiresIn`).
- How to securely store JWT secrets (using environment variables).

This example will give students a hands-on understanding of JWT in user authentication.