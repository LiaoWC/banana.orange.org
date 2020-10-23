var express = require('express');
var router = express.Router();


router.get('/todo_clock', (req, res) => {
    res.render('todo_clock')
})

module.exports = router;
