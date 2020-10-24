var express = require('express');
var router = express.Router();

// React example
router.get('/', (req, res) => {
    res.render('forum')
})

module.exports = router;
