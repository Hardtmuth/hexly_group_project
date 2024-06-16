import {
  getTaskId,
  createTask,
  removeTask,
  changeStatus,
  getTasksByText,
  removeTasksByText,
} from '../src/database.js';
import tempTask from '../__fixtures__/testTask.js';
import { result, result1, result2 } from '../__fixtures__/results.js';

const { text, status, priority } = tempTask;

test('create task', async () => {
  await createTask(text, status, priority);
  const response = await getTasksByText(text);

  expect(JSON.stringify(response)).toEqual(JSON.stringify(result));
  removeTasksByText(text);
});

test('change status task', async () => {
  await createTask(text, status, priority);
  const id = await getTaskId(text);

  await changeStatus(id[0].id, 'closed');
  const response = await getTasksByText(text);

  expect(JSON.stringify(response)).toEqual(JSON.stringify(result1));
  removeTasksByText(text);
});

test('remove task', async () => {
  await createTask(text, status, priority);
  const id = await getTaskId(text);

  await removeTask(id[0].id);
  const response = await getTasksByText(text);

  expect(JSON.stringify(response)).toEqual(JSON.stringify(result2));
  removeTasksByText(text);
});
