var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5')
var bodyParser = require('body-parser')
var config = require('../config')
var db = require('../database/database')
router.use(express.json())

const SUC_MSG = {"message": "success"}
const FAIL_MSG = {"message": "fail"}

// convenient to make a message object
function msg(message) {
    return {"message": String(message)}
}

//////////////////  todos ////////////////////////


const redirectionLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/user')
    } else {
        next()
    }
}

/* create a todo */
// TODO: 把redirect註解回來，並引回由session得userId的方式。
router.post('/todos/create'/*, redirectionLogin*/, function (req, res, next) {
    // const {userId} = req.session
    let userId = 1
    let state = parseInt( req.body['state'])
    let content = req.body['content']
    let deadline_date = req.body.deadline_date
    let time_to_finish = req.body['time_to_finish']

    if (isNaN(state)) {
        // return res.json({"message":"The state is not a valid integer."})
    }

    let sql = 'INSERT INTO todos(userId,state,content,deadline) VALUES(?,?,?,?)'
    let params = [userId, state, content, deadline_date + time_to_finish]
    console.log(params)
    db.run(sql, params, (err) => {
            if (err) {
                console.log(err.message)
                res.json(FAIL_MSG)
            } else {
                res.json(SUC_MSG)
            }
        }
    )
})

router.get('/todos/get_all'/*, redirectionLogin */, (req, res, next) => {
    // const {userId} = req.session
    let userId = parseInt(req.query['userId'])

    let sql = 'SELECT username,state,content,deadline FROM todos,users WHERE userId=?'
    let params = [userId]

    db.all(sql, params, (err, rows) => {
            if (err) {
                console.log(err.message)
                res.json(FAIL_MSG)
            } else {
                console.log(typeof rows)
                res.json(rows)
            }
        }
    )
})


// $.getJSON('http://127.0.0.1:8080/api/todos/create',
//     {'state':0,'content':'hola','content':'this is content','deadline_date':'1022','time_to_finish':'1822'},'json').done((data)=>{console.log(data)}).fail(function() {
//     console.log( "error" );
// })


//////////////////////////////////////////
module.exports = router;