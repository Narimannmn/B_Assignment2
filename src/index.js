const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const database = require('./db');
const path = require("path");
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewsPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

    app.use((req, res, next) => {
        res.locals.role = req.session.role;
        next();
});

app.use(express.static(__dirname + '/public'))
app.use(routes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
