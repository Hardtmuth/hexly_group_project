import request from './sqlRequest.js';

const deleteTask = `
  DELETE FROM tasks
`;

request(deleteTask);
