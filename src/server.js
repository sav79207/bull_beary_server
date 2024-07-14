const express = require('express');
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


app.get("/api/login", usersControllers.login);


sequelize.sync().then(() => {
    console.log('Database & tables created!');
    httpServer.listen(4001, () => {
        console.log(`API is listening on port 4001`);
    });
});