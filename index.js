import express from 'express';

const PORT = 8080;
const app = express();
app.use(express.json());

app.get('/tasks', (req, res) => {
  console.log('getting all tasks');
  res.status(200).json('not implemented');
});

app.get('/task', (req, res) => {
  console.log('getting tasks with id = ' + req.query.id);
  res.status(200).json('not implemented');
});

app.post('/task/create', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(200).json('not implemented');
});

app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT));