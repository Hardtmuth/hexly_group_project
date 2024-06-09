import express from 'express';
import {
  getAllTasks, getTaskId, createTask, removeTask, changeStatus, createTable, dropTable, changePriority, getTasksByPriority,
} from './src/database.js';

const PORT = 8080;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific allowed origin in production
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/tasks', async (req, res) => {
  console.log('getting all tasks');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  // allTasks.then(rows => res.status(200).json(rows));
  try {
    const allTasks = await getAllTasks();
    console.log(`QWE: ${JSON.stringify(allTasks)}`);
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/task', (req, res) => { // localhost:8080/task?id=2342
  console.log(`getting tasks with id = ${req.query.id}`);
  res.setHeader('Content-Type', 'application/json');
  const taskId = getTaskId(req.query.id);
  console.log(`taskId: ${taskId.then((rows) => res.status(200).json(rows))}`);
});

app.post('/task/create', (req, res) => {
  const { text, status, priority } = req.body;
  if (!text || !status || typeof priority !== 'number') {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const newTask = { text, status, priority };
  createTask(text, status, priority);
  res.status(201).json(newTask);
});

app.post('/task/remove', (req, res) => { // localhost:8080/task/remove?id=2
  console.log(`we want to remove in id =${req.query.id}`);
  const taskRemove = removeTask(req.query.id);
  console.log(`taskRemove: ${taskRemove.then((rows) => res.status(200).json(rows))}`);
});

app.post('/task/change-status', (req, res) => { // localhost:8080/task/change-status?id=3&status='closed'
  console.log(`we want to change status in id = ${req.query.id}`, req.query.status);
  const statusChange = changeStatus(req.query.id, req.query.status);
  console.log(`statusChange: ${statusChange.then((rows) => res.status(200).json(rows))}`);
});

app.post('/task/create-table', (req, res) => { // localhost:8080/task/create-table?name=tasks2
  console.log(`we want create new table with name =${req.query.name}`);
  const tableCreate = createTable(req.query.name);
  console.log(`tableCreate: ${tableCreate.then((rows) => res.status(200).json(rows))}`);
});

app.post('/task/drop-table', (req, res) => { // localhost:8080/task/drop-table?name=tasks2
  console.log(`we want drop table wtih name =${req.query.name}`);
  const tableDrop = dropTable(req.query.name);
  console.log(`tableDrop: ${tableDrop.then((rows) => res.status(200).json(rows))}`);
});

app.post('/task/change-priority', (req, res) => { // localhost:8080/task/change-priority?id=3&priority=2
  console.log(`we want to change priority in id = ${req.query.id}`, req.query.priority);
  const priorityChange = changePriority(req.query.id, req.query.priority);
  console.log(`priorityChange: ${priorityChange.then((rows) => res.status(200).json(rows))}`);
});

app.get('/task/get-priority', (req, res) => { // localhost:8080/task/get-priority?priority=2
  console.log(`getting priority =${req.query.id}`);
  res.setHeader('Content-Type', 'application/json');
  const getPriority = getTasksByPriority(req.query.priority);
  console.log(`getPriority: ${getPriority.then((rows) => res.status(200).json(rows))}`);
});

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT${PORT}`));
