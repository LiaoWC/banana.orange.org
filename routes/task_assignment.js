var express = require('express');
var router = express.Router();
var db = require('../database/database')
var config = require('../config')

// React example
router.post('/assign_old_version', (req, res) => {

    // let userId = req.session.userId
    let userId = 1 // TODO: change back to session way
    let names = req.body.names_arr || req.body['names_arr[]']
    let task = req.body['task']
    let deadline = req.body['deadline']

    console.log(req.body)

    if (!(userId && names && task && deadline)) {
        console.log('ERROR: there is a para which is undefined.')
        return res.json()
    }

    let sql = 'INSERT INTO assigned_tasks(assignerId,state,content,deadline) VALUES(?,?,?,?)'
    let params = [userId, 0, task, deadline]


    db.run(sql, params, (err) => {
        if (err) {
            console.log("ERROR:", err.message)
            res.json()
        } else {
            //
            sql = 'SELECT taskId FROM assigned_tasks ORDER BY taskId DESC LIMIT 1'
            params = []
            let last_taskId = -1
            db.get(sql, params, (err, row) => {
                if (err) {
                    console.log("ERROR:", err.message)
                    res.json()

                } else {
                    if (row) {
                        last_taskId = row['taskId']


                        sql = `INSERT INTO assigned_task_collaborator(taskId,username) VALUES(?,?)`
                        params_arr = []
                        for (let i = 0; i < names.length; i++) {
                            params_arr.push([last_taskId, names[i]])
                        }


                        db.serialize(function () {
                            let stmt = db.prepare(sql)
                            for (let i = 0; i < params_arr.length; i++) {
                                stmt.run(params_arr[i], (err) => {
                                    if (err) {
                                        console.log("ERROR:", err.message)
                                    } else {

                                    }
                                })
                            }
                            stmt.finalize()
                            res.json({})
                        })


                    } else {
                        res.json()

                    }

                }
            })
        }
    })

})


router.post('/assign_new_version', (req, res) => {

    // let userId = req.session.userId
    let userId = 1 // TODO: change back to session way
    let collaborators = req.body.names_string || req.body['names_string[]']
    let task = req.body['task']
    let deadline = req.body['deadline']

    if (!(userId && collaborators && task && deadline)) {
        console.log('ERROR: there is a para which is undefined.')
        return res.json()
    }

    let sql = `
        insert into task_assign(assignerId,state,content,deadline,collaborators) 
        values (?,?,?,?,?)    
    `
    let params = [userId, 0, task, deadline, collaborators]

    db.run(sql, params, (err) => {
        if (err) {
            console.log('ERROR:', err.message)
        }
        res.json()

    })


})


router.get('/not_be_completed', (req, res, next) => {

    // [       [ n, [ ] ,m   ],...   ]

    // TODO: use session
    let userId = 1

    let sql = 'SELECT taskId,content,collaborators,deadline FROM task_assign WHERE assignerId=? and state=0'
    let params = [userId]
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log("ERROR:", err.message)
            res.json()
        } else {
            if (rows) {
                return res.json(rows)
            } else {
                return res.json()
            }
        }
    })
})
router.get('/wait_for_checked', (req, res, next) => {

    // [       [ n, [ ] ,m   ],...   ]

    // TODO: use session
    let userId = 1

    let sql = 'SELECT taskId,content,collaborators,deadline FROM task_assign WHERE assignerId=? and state=1'
    let params = [userId]
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log("ERROR:", err.message)
            res.json()
        } else {
            if (rows) {
                return res.json(rows)
            } else {
                return res.json()
            }
        }
    })
})

router.get('/finish/:task_id', (req, res) => {
    let sql = 'UPDATE task_assign SET state=2 WHERE taskId=?'
    let params = [req.params.task_id]

    db.run(sql, params, (err) => {
        if (err) {
            console.log("ERROR:", err.message)
        } else {
        }
        res.redirect('/dashboard')
    })
})

module.exports = router;
