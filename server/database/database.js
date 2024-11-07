import mysql from "mysql2";
import "dotenv/config";

const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
});

connection.on("error", function (err) {
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    reconnectDatabase(); // Function to reconnect
  } else {
    throw err;
  }
});

function reconnectDatabase() {
  connection.connect((err) => {
    if (err) {
      setTimeout(reconnectDatabase, 2000); // Retry after 2 seconds
    } else {
      console.log("Reconnected to MySQL");
    }
  });
}

export { connection };
