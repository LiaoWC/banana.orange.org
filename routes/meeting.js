var express = require('express');
var router = express.Router();

var db = require('../database/database')


const redirectionLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/user')
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
  //res.render('meeting', { title: 'MEET' });

});




module.exports = router;
