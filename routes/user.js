var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5')
var bodyParser = require('body-parser')
var config = require('../config')
// router.use(bodyParser.urlencoded({extended: true}))
// router.use(bodyParser.json())

// reference: https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

// Databse
var db = require('../database/database')

const CUR_MAIN_PATH = '/user'

function fullPath(localPath) {
    return CUR_MAIN_PATH + localPath
}


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

const redirectionUserPage = (req, res, next) => {
    if (req.session.userId) {
        res.redirect(fullPath('/'))
    } else {
        next()
    }
}

router.get('/', redirectionLogin, (req, res) => {
    const {userId} = req.session
    let sql = 'SELECT id,username,email FROM users WHERE id = ?'
    let params = [userId]
    db.get(sql, params, (err, row) => {
        if (err) {
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
        const {email, password} = req.body
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
    req.session.destroy(err => {
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
        const {username, email, password} = req.body

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

module.exports = router;
