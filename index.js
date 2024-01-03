import express from 'express';
import mysql from 'mysql2';
import mycon from 'express-myconnection';
import routes from './routes.js';
import cors from "cors";
import {
    PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
} from './config.js';

const app = express();
app.disable('x-powered-by')
app.use(cors());

const dbOption = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
}

//Middlewares
app.use(mycon(mysql, dbOption, 'single'))
app.use(express.json());


//Routes
app.use('/api', routes)

// In case that the url dont exits
app.use((request, response) => {
    response.status(404).send("<h1>404</h1>")
})

//server running
app.listen(PORT, () => {
    console.log("server running on port", PORT);
})