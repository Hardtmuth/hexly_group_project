import express from 'express';
import {
  getAllTasks,
  getDeletedTasks,
  getTaskId,
  createTask,
  changeStatus,
  createTable,
  dropTable,
  changePriority,
  getTasksByPriority,
  removeRecycledTask,
  cartClean,
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
  try {
    const allTasks = await getAllTasks();
    console.log(`tasks: ${JSON.stringify(allTasks)}`);
    return res.status(200).json(allTasks);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/deleted-tasks', async (req, res) => {
  console.log('getting deleted tasks');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const allTasks = await getDeletedTasks();
    return res.status(200).json(allTasks);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/task', (req, res) => {
  console.log(`getting tasks with id = ${req.query.id}`);
  res.setHeader('Content-Type', 'application/json');
  const taskId = getTaskId(req.query.id);
  console.log(`taskId: ${taskId.then((rows) => res.status(200).json(rows))}`);
  return taskId;
});

app.post('/task/create', (req, res) => {
  const { text, status, priority } = req.body;
  if (!text || !status || typeof priority !== 'number') {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const newTask = { text, status, priority };
  createTask(text, status, priority);
  return res.status(201).json(newTask);
});

app.post('/task/remove', (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  if (!id || typeof id !== 'number') {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const delTask = { id };
  removeRecycledTask(id);
  return res.status(201).json(delTask);
});

app.post('/task/change-status', (req, res) => {
  const { id, status } = req.body;
  if (!id || typeof id !== 'number' || !status) {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const chStatus = { id, status };
  changeStatus(id, status);
  return res.status(201).json(chStatus);
});

app.post('/task/create-table', (req, res) => {
  console.log(`we want create new table with name =${req.query.name}`);
  const tableCreate = createTable(req.query.name);
  console.log(`tableCreate: ${tableCreate.then((rows) => res.status(200).json(rows))}`);
});

app.post('/task/drop-table', (req, res) => {
  console.log(`we want drop table wtih name =${req.query.name}`);
  const tableDrop = dropTable(req.query.name);
  console.log(`tableDrop: ${tableDrop.then((rows) => res.status(200).json(rows))}`);
});

app.post('/clean-cart', (req, res) => {
  cartClean();
  res.status(201).json('cart was clear');
});

app.post('/task/change-priority', (req, res) => {
  console.log(`we want to change priority in id = ${req.query.id}`, req.query.priority);
  const priorityChange = changePriority(req.query.id, req.query.priority);
  console.log(`priorityChange: ${priorityChange.then((rows) => res.status(200).json(rows))}`);
});

app.get('/task/get-priority', (req, res) => {
  console.log(`getting priority =${req.query.id}`);
  res.setHeader('Content-Type', 'application/json');
  const getPriority = getTasksByPriority(req.query.priority);
  console.log(`getPriority: ${getPriority.then((rows) => res.status(200).json(rows))}`);
});

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT${PORT}`));
