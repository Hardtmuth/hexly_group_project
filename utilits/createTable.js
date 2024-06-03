import request from './sqlRequest.js';


const requestTable = `
  CREATE TABLE tasks (
    id            INTEGER PRIMARY KEY UNIQUE,
    text          TEXT NOT NULL,
    status        TEXT, -- only open, closed, recycled
    priority      INTEGER -- 1: low, 2: default, 3: hight
  );
`;

request(requestTable);
