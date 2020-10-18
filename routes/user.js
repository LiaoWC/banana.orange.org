var express = require('express');
var router = express.Router();
var session = require('express-session');


const CUR_MAIN_PATH = '/user'
function fullPath(localPath){
    return CUR_MAIN_PATH + localPath
}

// Databse
var db = require('../database/database')


// === session ===

const SESSION_NAME = 'sid'
const SESSION_MAX_TIME = 1000 * 60 * 60 // 1hour
const SESSION_SECRET = 'ITSa#$@SESSION>_<SECRET.'

router.use(session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: SESSION_MAX_TIME, // 1 hour
        sameSite: true,
        secure: false, // After being developed, it should be turned to true. (need https)
    }
}))


// ===  ===

// TODO: This should be modified.
router.use((req, res, next) => {
    const {userId} = req.session
    if (userId) {
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
})


// TODO: database
const users = [
    {id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'secret'},
    {id: 2, name: 'Jeff', email: 'jeff@gmail.com', password: 'secret'},
    {id: 3, name: 'Tom', email: 'tom@gmail.com', password: 'secret'}
]


const redirectionLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect(fullPath('/login'))
    } else {
        next()
    }
}

const redirectionDashboard = (req, res, next) => {
    if (req.session.userId) {
        res.redirect(fullPath('/dashboard'))
    } else {
        next()
    }
}


router.get('/home', (req, res) => {
    // console.log(req.session)
    const {userId} = req.session
    res.send(`
        <h1>Welcome!</h1>
        ${userId ? `
        <a href="${fullPath('/dashboard')}">Dashboard</a>
        <form method="post" action="${fullPath('/logout')}">
            <button>Logout</button>
        </form>\
        ` : `
        <a href="${fullPath('/login')}">Login</a>
        <a href="${fullPath('/register')}">Register</a>
        `}
    `)
})


router.get('/dashboard', redirectionLogin, (req, res) => {
    const user = users.find(
        user => user.id === req.session.userId
    )

    res.send(`
        <h1>Dashboard</h1>
        <a href="${fullPath('/home')}">Main</a>
        <ul>
            <li>Name: ${user.name}</li>   
            <li>Email: ${user.email}</li>  
        </ul>
        <form method="post" action="${fullPath('/logout')}" >
            <input type="submit" value="logout" />
        </form>
    `)
})

router.get('/profile', redirectionLogin, (req, res) => {
    const {user} = res.locals
})

router.get('/login', redirectionDashboard, (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method="post" action="${fullPath('/login')}">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="submit" />
        </form>
        <a href="${fullPath('/register')}">Register</a>
    `)
})
router.get('/register', redirectionDashboard, (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method="post" action="${fullPath('/register')}">
            <input name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="submit" />
        </form>
        <a href="${fullPath('/register')}">Login</a>
    `)
})

router.post('/login', redirectionDashboard, (req, res) => {
    const {email, password} = req.body
    if (email && password) {
        const user = users.find(
            user => user.email === email && user.password === password // TODO: hash
        )
        if (user) {
            req.session.userId = user.id
            return res.redirect(fullPath('/dashboard'))
        }
    }

    res.redirect(fullPath('/login'))
})
router.post('/register', redirectionDashboard, (req, res) => {
    const {name, email, password} = req.body

    if (name && email && password) { // TODO: validation
        const exists = users.some(
            user => user.email === email
        )

        if (!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password // TODO: hash
            }
            users.push(user)

            req.session.userId = user.id

            return res.redirect(fullPath('/dashboard'))
        }
    }

    res.redirect(fullPath('/register'))
    // TODO: qs /register?error=error.auth.userExists or e.g. email too short
})

router.post('/logout', redirectionLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect(fullPath('/dashboard'))
        }
        res.clearCookie(SESSION_NAME)
        res.redirect(fullPath('/login'))
    })
})


// Get user list
router.get('/list', (req, res, next) => {
    var sql = "select * from users"
    var parmameters = []
    db.all(sql, parmameters, (err, rows) => {
            if (err) {
                res.status(400).json({"error": err.message})
                return
            }
            res.json({
                "message": "success",
                "data": rows
            })
        }
    )
})


// GET /user/list
// GET /user/{id}
// POST /user/

module.exports = router;
