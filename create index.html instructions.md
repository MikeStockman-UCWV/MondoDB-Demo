create index.html instructions.txt

To create an `index.html` file that uses MongoDB to display all records from the `school` database, you'll need to implement the following steps:

1. **Backend Setup (Express + MongoDB)**: 
   - The backend should serve the MongoDB data as a REST API.
   
2. **Frontend (HTML + JavaScript)**: 
   - The `index.html` will fetch data from the backend API and display it in the browser.

Here’s how you can do it.

### 1. Backend (Node.js + MongoDB API)

Make sure you have the following route in your `server.js` (Node.js backend) to fetch the students from the MongoDB `school` database and serve it as JSON.

#### Add this route to your `server.js`:

```javascript
app.get('/api/students', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('students');
  const students = await collection.find({}).toArray();
  res.json(students);
});
```

This API endpoint will return all the student records from MongoDB in JSON format when accessed.

### 2. Frontend (HTML + JavaScript)

Now, let’s create an `index.html` file that fetches data from this API and displays the student records in a table.

#### Create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Records</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

    <h1>Student Records</h1>
    
    <table id="studentsTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Major</th>
            </tr>
        </thead>
        <tbody>
            <!-- Student data will be inserted here -->
        </tbody>
    </table>

    <script>
        // Function to fetch and display student records
        async function fetchStudentRecords() {
            try {
                // Fetch data from the backend API
                const response = await fetch('/api/students');
                const students = await response.json();

                // Reference to the table body
                const tableBody = document.querySelector('#studentsTable tbody');

                // Clear the existing table rows
                tableBody.innerHTML = '';

                // Loop through the students and create table rows
                students.forEach(student => {
                    const row = document.createElement('tr');
                    
                    // Create table data cells for name, age, and major
                    const nameCell = document.createElement('td');
                    nameCell.textContent = student.name;
                    
                    const ageCell = document.createElement('td');
                    ageCell.textContent = student.age;

                    const majorCell = document.createElement('td');
                    majorCell.textContent = student.major;

                    // Append cells to the row
                    row.appendChild(nameCell);
                    row.appendChild(ageCell);
                    row.appendChild(majorCell);

                    // Append the row to the table body
                    tableBody.appendChild(row);
                });
            } catch (error) {
                console.error('Error fetching student records:', error);
            }
        }

        // Fetch the student records when the page loads
        window.onload = fetchStudentRecords;
    </script>

</body>
</html>
```

### How it works:
1. **HTML Structure**: The file contains a basic HTML table that will display student records (name, age, major).
2. **JavaScript Fetch API**: When the page loads, the JavaScript code sends a `GET` request to `/api/students`, retrieves the JSON data, and dynamically adds rows to the table for each student.
3. **Styling**: Simple CSS to make the table look clean and organized.

### 3. Serving the HTML

To serve the `index.html` file, add the following route in your `server.js`:

```javascript
const path = require('path');

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
```

### 4. Run Your Application

1. **Start the Node.js server**:
   ```bash
   node server.js
   ```

2. **Visit the App in the Browser**:
   - Open your browser and navigate to `http://localhost:3000`.
   - The `index.html` will be displayed, showing the list of students from your MongoDB database in a table format.

### Conclusion

With this setup, you're demonstrating how to connect a front-end HTML page to a back-end Node.js server that interacts with a MongoDB database. This is a full-stack example where the frontend dynamically fetches and displays data from the backend.