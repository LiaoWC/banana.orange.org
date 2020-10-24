var db = require('../database/database')


var express = require('express');
var router = express.Router();

// React example
router.get('/', (req, res, next) => {
    res.render('jitsi')
})

module.exports = router;

router.post('/todos/save_img'/*, redirectionLogin*/, function (req, res, next) {
    // const {userId} = req.session
    let groupname = req['groupname']
    dataURL = req[dataURL]

    date_ = string(Date.now())
    let sql = 'INSERT INTO screenshot(group,date,dataURL) VALUES(?,?,?)'
    let params = [groupname, date_, dataURL]
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