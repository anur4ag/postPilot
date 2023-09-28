const Pool = require("pg").Pool;

const client = new Pool({
  host: "localhost",
  port: 5432,
  database: "postpilotdb",
  user: "postgres",
  password: "123456",
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err);
  } else {
    console.log("connected to postpilotdb");
  }
});
module.exports = client;
