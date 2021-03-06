var express = require('express');
var router = express.Router();

var db = require('../database/database')


const redirectionLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/user/login')
  } else {
    next()
  }
}

/* GET users listing. */
router.get('/', redirectionLogin, function (req, res, next) {
  const { userId } = req.session
  let sql = 'SELECT id,username,email FROM users WHERE id = ?'
  let params = [userId]
  db.get(sql, params, (err, row) => {
    if (err) {
    } else {
      if (row) {
        return res.render('meeting', {
          title: 'MEET',
          user_id: row["id"],
          user_name: row["username"],
          user_email: row["email"]
        })
      }
    }
  })
});


router.get('/control', redirectionLogin, function (req, res, next) {
  const { userId } = req.session
  let sql = 'SELECT id,username,email FROM users WHERE id = ?'
  let params = [userId]
  db.get(sql, params, (err, row) => {
    if (err) {
    } else {
      if (row) {
        return res.render('meeting_control', {
          title: 'MEET',
          user_id: row["id"],
          user_name: row["username"],
          user_email: row["email"]
        })
      }
    }
  })
});

router.get('/closed', redirectionLogin, function (req, res, next) {
  const { userId } = req.session
  let sql = 'SELECT id,username,email FROM users WHERE id = ?'
  let params = [userId]
  db.get(sql, params, (err, row) => {
    if (err) {
    } else {
      if (row) {
        return res.render('meeting_closed', {
          title: 'MEET',
          user_id: row["id"],
          user_name: row["username"],
          user_email: row["email"]
        })
      }
    }
  })
});




module.exports = router;
