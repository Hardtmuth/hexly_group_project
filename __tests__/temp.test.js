
import {
  getTaskId,
  createTask,
  removeTask,
  changeStatus,
  getTasksByText,
  removeTasksByText,
} from '../src/database.js';

const tempTask = {
  text: 'temp task',
  status: 'open',
  priority: 1
};

const { text, status, priority } = tempTask;

const result = { "task": [{ "text": 'temp task', "status": 'open', "priority": 1 }] };
const result1 = { "task": [{ "text": 'temp task', "status": 'closed', "priority": 1 }] };
const result2 = { "task": [{ "text": 'temp task', "status": 'recycled', "priority": 1 }] };

test('create task', async () => {
  await createTask(text, status, priority);
  const response = await getTasksByText(text);

  expect(response).toEqual(result);
  removeTasksByText(text);
});

test('change status task', async () => {
  await createTask(text, status, priority);
  const id = await getTaskId(text);

  await changeStatus(id[0].id, 'closed');
  const response = await getTasksByText(text);

  expect(response).toEqual(result1);
  removeTasksByText(text);
});

test('remove task', async () => {
  await createTask(text, status, priority);
  const id = await getTaskId(text);

  await removeTask(id[0].id);
  const response = await getTasksByText(text);

  expect(response).toEqual(result2);
  removeTasksByText(text);
});