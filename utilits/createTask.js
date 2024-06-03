import request from './sqlRequest.js';


const createTask = `
  INSERT INTO tasks (
    text,
    status,
    priority
  )
  VALUES (
    'GO to space',
    'open',
    1
  );
`;

request(createTask);