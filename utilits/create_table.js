import request from './sqlRequest.js';


const request = `
  CREATE TABLE temp1 (
    id            INTEGER PRIMARY KEY UNIQUE,
    text          TEXT NOT NULL,
    status        TEXT,
    priority      TEXT
  );
`;

request(request)

