const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://michaelstockman:<db_password>@cluster0.amuot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // or your MongoDB Atlas connection string
const client = new MongoClient(url);

// Database Name
const dbName = 'school';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  
  const db = client.db(dbName);
  const studentsCollection = db.collection('students');

  return { db, studentsCollection };
}

main().catch(console.error);
