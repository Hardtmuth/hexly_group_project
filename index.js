import express from 'express';
import { getAllTasks } from './src/database.js';

const PORT = 8080;
const app = express();
app.use(express.json());

app.get('/tasks', (req, res) => {
  console.log('getting all tasks...');
  const allTasks = getAllTasks();
  console.log(allTasks);
  res.status(200).json(allTasks);
});

app.get('/task', (req, res) => {
  console.log(`getting tasks with id = ${req.query.id}`);
  res.status(200).json('not implemented sdfsdf');
});

app.post('/task/create', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(200).json('not implemented');
});

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT${PORT}`));
