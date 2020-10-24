var express = require('express');
var router = express.Router();
var db = require('../database/database')

//
router.get('/', (req, res) => {
    let sql = 'SELECT boardId,boardname FROM boards'
    let params = []
    db.all(sql,params,(err,rows)=>{
        if(err){
            console.log("ERROR:",err.message)
        } else{
            if(rows){
                console.log("rows:",rows)
                for (let row of rows){
                    console.log("row:",row)
                    let boardId = row['boardId']
                    let boardname = row['boardname']
                    console.log('boarbbb:',boardId)

                    let sql2 = 'SELECT postId,title,authorId,date,content FROM posts WHERE boardId=?'
                    let params2 = [boardId]

                    db.all(sql2,params2,(err,posts_rows)=>{
                        if(err){
                            console.log("ERROR:",err.message)
                        } else{
                            if(rows){
                                console.log(posts_rows)

                            }
                        }
                    })




                }
            }

        }
        console.log(rows)
    })

    res.render('forum')
})

module.exports = router;