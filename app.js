// === Require ===
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser')
var config = require('./config')
var db = require('./database/database')

// === Initialization ===
var app = express();

// === Constants ===

// === View engine setup ===
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// === Middlewares ===
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
// session
app.use(session({
    name: config.SESSION_NAME,
    resave: config.SESSION_RESAVE,
    saveUninitialized: config.SESSION_SAVEUNINITIALIZED,
    secret: config.SESSION_SECRET,
    cookie: {
        maxAge: config.SESSION_COOKIE_MAX_TIME, // 1 hour
        sameSite: config.SESSION_COOKIE_SAMESITE,
        secure: config.SESSION_COOKIE_SECURE,
        httpOnly: config.SESSION_COOKIE_HTTPONLY,
        path: config.SESSION_COOKIE_PATH
    }
}))
// Check if have logged in.
app.use((req, res, next) => {
    // console.log("A res")
    const {userId} = req.session
    // console.log("req",req.method,req.path)
    // console.log("app:",req.session)
    if (userId) { // has logged in
        let sql = 'SELECT id,name,email FROM users WHERE id = ?'
        let params = [userId]
        db.get(sql, params, (err, row) => {
            if (err) {
            } else {
                if (row) {
                    // console.log("")
                    res.locals.userId = row["id"]
                    res.locals.username = row["name"]
                    res.locals.email = row["email"]
                }
            }
            next() // This next() is important since we have to wait for finishing query.
        })
    } else {
        next()
    }
})

// === Router require ===
var userRouter = require('./routes/user')
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var exampleRouter = require('./routes/example')
var meetingRouter = require('./routes/meeting')
var apiRouter = require('./routes/api')
var todoClockRouter = require('./routes/todo_clock')
var dashboardRouter = require('./routes/dashboard')
var forumRouter = require('./routes/forum')

// === Use routers ===
app.use('/', indexRouter);
app.use('/example', exampleRouter)
app.use('/test', testRouter);
app.use('/user', userRouter);
app.use('/meeting', meetingRouter);
app.use('/api', apiRouter);
app.use('/todo_clock', todoClockRouter)
app.use('/dashboard', dashboardRouter)
app.use('/forum',forumRouter)

app.get('/jitsi', (req, res, next) => {
    res.render('jitsi')
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


// source: source: https://stackoverflow.com/questions/49897613/how-to-use-session-in-expressjs-view-file-pug
// source: https://stackoverflow.com/questions/35340036/accessing-session-variable-in-jade








