import mysql from 'mysql2';
import "dotenv/config";


const connection = mysql.createConnection({
    host:process.env.db_host,
    user:process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_database
})

export { connection };
