var express = require('express');
var router = express.Router();


// Databse
var db = require('../database/database')


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

// GET /user/list
// GET /user/{id}
// POST /user/













module.exports = router;
