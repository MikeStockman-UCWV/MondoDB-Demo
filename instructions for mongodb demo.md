instructions for mongodb demo.txt

To demonstrate the MongoDB walk-through, you'll need to show the working CRUD operations (Create, Read, Update, Delete) using MongoDB and Node.js. Here’s how you can set up and walk through the example, both on your local machine and using MongoDB Atlas (for cloud storage). Follow these steps to ensure everything works seamlessly:

### **1. Install and Set Up MongoDB**

#### **Option A: Use MongoDB Atlas (Cloud-based)**
- **Create an Account on MongoDB Atlas:**
  - Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up for a free tier.
  - Create a new cluster.
  - In the database tab, click "Connect", choose "Connect your application", and get the connection string.
  
  Example connection string:
  ```
  mongodb+srv://<username>:<password>@cluster.mongodb.net/test
  ```
  Replace `<username>` and `<password>` with your credentials.

- **Update Your Code**: Replace the MongoDB connection string in the code:
  ```javascript
  const url = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/test';
  ```

#### **Option B: Use Local MongoDB Installation**
- **Install MongoDB**:
  - If MongoDB is not installed on your machine, [download it](https://www.mongodb.com/try/download/community) and follow the installation instructions.
  - After installation, ensure MongoDB is running:
    ```bash
    mongod --dbpath /path/to/your/database
    ```
  - Update the connection URL in your code to use `mongodb://localhost:27017` (local instance).

### **2. Install Node.js and Dependencies**

Make sure you have [Node.js](https://nodejs.org/en/download/) installed. Then, follow these steps:

- **Install dependencies**:
  In the project folder where your `server.js` is located, run:
  ```bash
  npm install express mongodb
  ```

### **3. Modify Your `server.js` File**

Ensure your `server.js` includes all CRUD operations (as previously mentioned) for creating, reading, updating, and deleting data.

Here’s a sample of your final file structure:

```javascript
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
app.use(express.json());

// Connection URL
const url = 'mongodb://localhost:27017'; // or your MongoDB Atlas connection string
const client = new MongoClient(url);
const dbName = 'school';

async function connectDB() {
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  return client.db(dbName);
}

// Route to create (insert) students
app.post('/students', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('students');
  const result = await collection.insertOne(req.body);
  res.status(201).send(`Student added with ID: ${result.insertedId}`);
});

// Route to read (find) students
app.get('/students', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('students');
  const students = await collection.find({}).toArray();
  res.json(students);
});

// Route to update a student
app.put('/students/:name', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('students');
  const result = await collection.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  res.send(`Updated ${result.matchedCount} student(s)`);
});

// Route to delete a student
app.delete('/students/:name', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('students');
  const result = await collection.deleteOne({ name: req.params.name });
  res.send(`Deleted ${result.deletedCount} student(s)`);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### **4. Run the Application**

- **Start the Server**:
  In your terminal, navigate to your project directory and run the following command to start the server:
  ```bash
  node server.js
  ```

- The server will be running on `http://localhost:3000` (or you can use an appropriate cloud URL if deployed on a service like Heroku).

### **5. Demonstrate CRUD Operations**

You can use a tool like **Postman** or **cURL** to demonstrate the requests. Here’s how to test each CRUD operation.

#### **Create (Insert) a Student**
- **Endpoint:** `POST /students`
- **Body** (JSON):
  ```json
  {
    "name": "Alice",
    "age": 22,
    "major": "Computer Science"
  }
  ```
- **Postman Example**: Send a `POST` request to `http://localhost:3000/students` with the body above.

#### **Read (Find) Students**
- **Endpoint:** `GET /students`
- **Response**: A list of students currently in the database.

- **Postman Example**: Send a `GET` request to `http://localhost:3000/students`.

#### **Update a Student's Major**
- **Endpoint:** `PUT /students/:name` (replace `:name` with the student's name, e.g., `Alice`).
- **Body** (JSON):
  ```json
  {
    "major": "Data Science"
  }
  ```
- **Postman Example**: Send a `PUT` request to `http://localhost:3000/students/Alice` with the body above.

#### **Delete a Student**
- **Endpoint:** `DELETE /students/:name` (replace `:name` with the student's name).
- **Postman Example**: Send a `DELETE` request to `http://localhost:3000/students/Alice`.

### **6. Observe Changes in MongoDB**

You can observe the data changes directly in the MongoDB shell or through MongoDB Compass (GUI tool for MongoDB):

- **Using MongoDB shell**:
  ```bash
  mongo
  use school
  db.students.find().pretty()
  ```
- **Using MongoDB Compass**:
  - Download [MongoDB Compass](https://www.mongodb.com/products/compass).
  - Connect to your database (either locally or via MongoDB Atlas).
  - View the `students` collection and observe how it updates with each operation.

### **7. Wrap-up and Discussion**

- After demonstrating the operations, you can discuss with your class:
  - **Database connection handling**: Opening and closing connections.
  - **CRUD operations and their performance**.
  - **Differences between using MongoDB Atlas (cloud-based) and local MongoDB**.
  - **How you could scale this app, handle errors, and add security measures**.

This practical demonstration will help students understand how to interact with a MongoDB database through a Node.js application, how RESTful APIs work, and how MongoDB supports flexible, NoSQL data storage.