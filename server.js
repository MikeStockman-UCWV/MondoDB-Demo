const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
app.use(express.json());

// Connection URL
const url = 'mongodb+srv://michaelstockman:Freed0m.1@cluster0.amuot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // or your MongoDB Atlas connection string
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

app.get('/api/students', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('students');
  const students = await collection.find({}).toArray();
  res.json(students);
});

const path = require('path');

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
