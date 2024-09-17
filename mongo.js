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

async function insertStudents() {
    const { studentsCollection } = await main();
  
    const newStudents = [
      { name: 'Alice', age: 22, major: 'Computer Science' },
      { name: 'Bob', age: 23, major: 'Mathematics' },
      { name: 'Charlie', age: 24, major: 'Physics' }
    ];
  
    const result = await studentsCollection.insertMany(newStudents);
    console.log(`${result.insertedCount} students were added.`);
  }
  
  insertStudents();

  async function findStudents() {
    const { studentsCollection } = await main();
  
    const students = await studentsCollection.find({}).toArray();
    console.log('Students:');
    console.log(students);
  }
  
  findStudents();

  async function updateStudent() {
    const { studentsCollection } = await main();
  
    const updateResult = await studentsCollection.updateOne(
      { name: 'Alice' },
      { $set: { major: 'Data Science' } }
    );
  
    console.log(`Updated ${updateResult.matchedCount} student's major.`);
  }
  
  updateStudent();

  async function deleteStudent() {
    const { studentsCollection } = await main();
  
    const deleteResult = await studentsCollection.deleteOne({ name: 'Bob' });
    console.log(`Deleted ${deleteResult.deletedCount} student's record.`);
  }
  
  deleteStudent();

  