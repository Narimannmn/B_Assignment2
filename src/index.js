const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const database = require('./db');
const path = require("path");
const helmet = require('helmet')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet())
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https://kit.fontawesome.com', 'https://cdn.jsdelivr.net', 'https://stackpath.bootstrapcdn.com', 'https://api.mapbox.com','*'],
            'script-src-attr': ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", 'https://cdn.jsdelivr.net', 'https://stackpath.bootstrapcdn.com', 'https://api.mapbox.com', "'unsafe-inline'"],
            fontSrc: ["'self'", 'https://kit-free.fontawesome.com', 'https://cdn.jsdelivr.net', 'https://api.mapbox.com', 'https://ka-f.fontawesome.com'],
            connectSrc: ["'self'", '*'],
            imgSrc: ["'self'", 'data:', '*'],
        },
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
console.log(viewsPath)
app.set("view engine", "ejs");


app.use(session({
    secret: "asdajnsdlkasbdkh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use((req, res, next) => {
    res.locals.role = req.session.role;
    next();
});

app.use(express.static(__dirname + '/public'));

app.use(routes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
