import request from './sqlRequest.js';

const deletTask = `
  DELETE FROM tasks
`;

request(deletTask);