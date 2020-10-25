var express = require('express');
var router = express.Router();
var config = require('../config')

router.get('/', (req, res) => {
    res.render('team', {'team': config.TEAM_MEMBERS})
})

module.exports = router;