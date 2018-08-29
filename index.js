const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const routes = require('./routes/index');

const app = express();

app.set('port0', process.env.PORT || 4000);
app.set('superSecret', 'dashuai!');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'AngelMusicofManagement',
    key: 'youGuess', //cookie name
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

routes(app);



app.listen(app.get('port0'), function () {
    console.log('Big Project Server Listen on Port ' + app.get('port0'));
});