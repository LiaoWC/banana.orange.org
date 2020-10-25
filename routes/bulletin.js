var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('bulletin')
})

module.exports = router;