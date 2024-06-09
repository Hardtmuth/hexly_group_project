import request from './sqlRequest.js';

const change = `
  UPDATE temp SET status = 'closed' WHERE id = 12312312
`;

request(change);
