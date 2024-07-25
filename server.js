const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'reactuser', // Replace with your MySQL username
  password: '12345', // Replace with your MySQL password
  database: 'react',
  port: 3306
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Create database and table if not exists
db.query('CREATE DATABASE IF NOT EXISTS react', (err) => {
  if (err) {
    throw err;
  }
  console.log('Database created');
});

db.query('USE react', (err) => {
  if (err) {
    throw err;
  }
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS formData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT
  )
`;

db.query(createTableQuery, (err) => {
  if (err) {
    throw err;
  }
  console.log('Table created');
});

// Define routes
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  const insertQuery = 'INSERT INTO formData (name, email, message) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, email, message], (err) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred', error: err });
    } else {
      res.status(200).json({ message: `Hello your response has been saved` });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
