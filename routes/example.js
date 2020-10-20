var express = require('express');
var router = express.Router();

// React example
router.get('/tictactoe', (req, res) => {
    res.render('tictactoe')
})

module.exports = router;
