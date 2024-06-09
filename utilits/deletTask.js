import request from './sqlRequest.js';

const deletTask = `
DELETE FROM temp
WHERE id = 1231231223;
`;

request(deletTask);
