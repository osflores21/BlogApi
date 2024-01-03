const express  = require('express');
const mysql = require('mysql2');
const mycon = require('express-myconnection');
const routes = require("./routes")
const config = require("./config")
const cors = require("cors");
const app = express();
app.disable('x-powered-by')
app.use(cors());

const dbOption = {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
}
//Middlewares

app.use(mycon(mysql, dbOption, 'single'))
app.use(express.json());


//Routes
app.use('/api',routes)

// In case that the url dont exits
app.use((request,response) => {
    response.status(404).send("<h1>404</h1>")
})

//server running
app.listen(app.get('port'), () =>{
    console.log("server running on port", config.DB_PORT );
})