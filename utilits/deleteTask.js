import request from './sqlRequest.js';

const deleteTask = `
DELETE FROM temp
WHERE id = 1231231223;
`;

request(deleteTask);
