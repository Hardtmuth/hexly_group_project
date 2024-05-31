import express from 'express';
import sqlite3 from 'sqlite3';


let db = new sqlite3.Database('./db/tasks.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
  db.each(`SELECT id, name FROM status`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log('QWE:' + row.id + "\t" + row.name);
  });
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

const PORT = 8080;
const app = express();
app.use(express.json());

app.get('/tasks', (req, res) => {
  console.log('getting all   tasks');
  res.status(200).json('not implemented');
});

app.get('/task', (req, res) => {
  console.log('getting tasks with id = ' + req.query.id);
  res.status(200).json('not implemented sdfsdf');
});

app.post('/task/create', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(200).json('not implemented');
});

app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT));