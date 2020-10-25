var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5')
var bodyParser = require('body-parser')
var config = require('../config')
var schedule = require('node-schedule');
// router.use(bodyParser.urlencoded({extended: true}))
// router.use(bodyParser.json())

// reference: https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

// Databse
var db = require('../database/database');

var current_user = new Object
var time_record = new Array

const CUR_MAIN_PATH = '/user'

function fullPath(localPath) {
    return CUR_MAIN_PATH + localPath
}


// TODO: database
const users = [
    { id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'secret' },
    { id: 2, name: 'Jeff', email: 'jeff@gmail.com', password: 'secret' },
    { id: 3, name: 'Tom', email: 'tom@gmail.com', password: 'secret' }
]


const redirectionLogin = (req, res, next) => {
    console.log(req.session.userId)
    if (!req.session.userId) {
        res.redirect(fullPath('/login'))
    } else {
        next()
    }
}

const redirectionUserPage = (req, res, next) => {
    if (req.session.userId) {
        res.redirect(fullPath('/'))
    } else {
        next()
    }
}

router.get('/', redirectionLogin, (req, res) => {
    const { userId } = req.session
    let sql = 'SELECT id,username,email FROM users WHERE id = ?'
    let params = [userId]
    db.get(sql, params, (err, row) => {
        if (err) {
            console.log("ERROR:", err.message)
        } else {
            if (row) {
                return res.render('user/user', {
                    user_name: row["username"],
                    user_email: row["email"]
                })
            }
        }
        res.redirect('/')
    })
})

// router.get('/profile', redirectionLogin, (req, res) => {
//     const {user} = res.locals
// })

router.route('/login')
    // Get the page of login
    .get(redirectionUserPage, (req, res,) => {
        res.render('user/login')
    })
    // Submit login form
    .post(redirectionUserPage, (req, res) => {
        const { email, password } = req.body
        if (email && password) {
            // Find if the email and password the same as what kept in database.
            let sql = 'SELECT * FROM users WHERE email=? and password=?'
            let params = [email, md5(password)]
            console.log("email:", email)
            console.log("password:", md5(password))
            db.get(sql, params, (err, row) => {
                if (err) {
                    res.redirect(fullPath('/login'))
                } else {
                    if (row) {
                        req.session.userId = row["id"]
                        let date_ = Date.now()

                        current_user[req.session.userId] = [email, date_, row["username"]]
                        if (!(row["username"] in time_record)) {
                            let start = new Date(date_ * 1000)
                            time_record[row["username"]] = [start, null]
                        }

                        return res.redirect(fullPath('/'))
                    } else {
                        res.redirect(fullPath('/login'))
                    }
                }
            })

            // const user = users.find(
            //     user => user.email === email && user.password === password // TODO: hash
            // )
            // if (user) {
            //     req.session.userId = user.id
            //     return res.redirect(fullPath('/'))
            // }
        } else {
            res.redirect(fullPath('/login'))
        }
    })


router.all('/logout', redirectionLogin, (req, res) => {
    req.session.destrowy(err => {
        if (err) {
            return res.redirect(fullPath('/'))
        }
        res.clearCookie(config.SESSION_NAME)
        // APP.cookieClear(res)
        res.redirect('/')
    })
})


router.route('/register')
    .get(redirectionUserPage, (req, res) => {
        res.render('user/register')
    })
    .post(redirectionUserPage, (req, res) => {
        const { username, email, password } = req.body

        if (username && email && password) { // TODO: validation
            console.log('wwwwww0')
            // Check if username exists
            let sql = 'SELECT * FROM users WHERE username = ?'
            let params = [username]
            db.get(sql, params, (err, row) => {
                if (err) {
                    console.log('wwwwww')
                    return res.redirect('/')
                } else {
                    if (row) {
                        console.log('wwwwww3')
                        return res.redirect('/')
                    } else {
                        // No error and get an existed row
                        sql = 'INSERT INTO users (username,email,password) VALUES (?,?,?)'
                        params = [username, email, md5(password)]
                        db.run(sql, params, (err) => {
                            if (err) {
                            } else {
                            }
                        })
                        console.log('wwwwww2')
                        return res.redirect('/')
                    }
                }
            })
        } else {
            console.log('wwwwww4')
            return res.redirect(fullPath('/register'))
        }
        // TODO: /register?error=error.auth.userExists or e.g. email too short
    })


// Get user list
router.get('/list', (req, res, next) => {
    var sql = "select * from users"
    var parmameters = []
    db.all(sql, parmameters, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({
            "message": "success",
            "data": rows
        })
    }
    )
})

// Get current user list
router.get('/current_list', (req, res, next) => {
    res.json(current_user)
})

// Check is someone lazy
router.get('/check_status', (req, res, next) => {
    if (!req.session.userId) {
        res.redirect(fullPath('/login'));
    }
    else {
        current_user[req.session.userId][1] = Date.now()
        res.redirect('/');
    }
})


function savework(username, record) {
    var sql = "INSERT INTO work_time(username,starttime,stoptime) VALUES(?,?,?)"
    var parmameters = [username, record[0], record[1]]
    try {
        db.run(sql, params, (err) => {
            if (err) {
                console.log(err.message)
                res.json(FAIL_MSG)
            } else {
                res.json(SUC_MSG)
            }
        })
    }
    catch {
        console.log("Null")
    }
}


// Kill Lazy Guy 
var rule = new schedule.RecurrenceRule();
rule.minute = [0, 15, 30, 45]

var j = schedule.scheduleJob(rule, function () {
    let time_ = Date.now()
    console.log('Time to catch lazy GUY!');
    console.log(current_user)
    console.log(time_)
    for (let key in current_user) {
        let online = ((time_ - current_user[key][1]) < 15 * 60 * 100) //15分鐘check
        console.log(online)
        if (!online) {
            let user_ = current_user[key][2]
            let stop = new Date(current_user[key][1] * 1000)
            time_record[user_][1] = stop
            savework(user_, time_record[user_])
            delete current_user[key]
        }
    }
    console.log(current_user)
});


module.exports = router;
