import request from "./sqlRequest.js";



const dropTable = `
  DROP TABLE tasks
`;

request(dropTable);


