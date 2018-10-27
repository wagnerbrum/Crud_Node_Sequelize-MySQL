var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index_router = require('./routes/index');
var usuarios_router = require('./routes/usuarios');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());//converter corpo da requisição em json
app.use(express.urlencoded({ extended: false })); // negar codificação ex %20...
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_router);
app.use('/usuarios', usuarios_router);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, function () {
    console.info("Servidor rodando na porta 3000");
})

module.exports = app;