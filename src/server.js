const express = require('express');
require('dotenv').config();
const { createServer } = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersControllers = require('./controllers/users');

const sequelize = require('./db');

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API is UP");
});


app.get("/login", usersControllers.login);
app.post("/user/:id", usersControllers.getUser);


sequelize.sync().then(() => {
    console.log('console.log(process.env);', process.env.DB_NAME);
    console.log('Database & tables created!');
    httpServer.listen(3000, () => {
        console.log(`API is listening on port 3000`);
    });
});