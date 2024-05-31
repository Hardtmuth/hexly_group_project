import request from './sqlRequest.js';


const request = `
  INSERT INTO temp (
    id,
    text,
    status,
    priority
  )
  VALUES (
    1231231223,
    'regbnm vjkjr',
    'open',
    'hight'
  );
`;

request(request);