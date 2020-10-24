var express = require('express');
var router = express.Router();
var db = require('../database/database')
var config = require('../config')

function date_format_transform(str) {
    let position1 = 4
    let position2 = 7
    let a = str
    let b = '/'
    let output1 = [a.slice(0, position1), b, a.slice(position1)].join('')
    return [output1.slice(0, position2), b, output1.slice(position2)].join('')
}


//
router.get('/', (req, res) => {

    let sql = `SELECT boards.boardId,boardname,posts.postId,title,date FROM boards,posts WHERE boards.boardId=posts.boardId ORDER BY boards.boardId`
    let params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log("ERROR:", err.message)
            return res.render('forum')
        } else {
            if (rows) {
                let boards_list = []
                let this_boardname = ''
                let posts_list = []
                let this_series_boardId = -1
                for (let row of rows) {

                    let cur_boardId = row['boardId']
                    console.log('cur_boardId:', cur_boardId)
                    console.log('thisboardId:', this_series_boardId)
                    if (!(cur_boardId === this_series_boardId || this_series_boardId < 0)) {
                        console.log("@@@")
                        boards_list.push([this_boardname, posts_list])
                        posts_list = []
                    }
                    this_series_boardId = cur_boardId
                    this_boardname = row['boardname']


                    let temp_obj = {
                        postId: row['postId'],
                        title: row['title'],
                        postDate: date_format_transform(row['date'])
                    }
                    posts_list.push(temp_obj)

                    console.log(posts_list)
                }
                boards_list.push([this_boardname, posts_list])

                console.log(boards_list)
                return res.render('forum', {boards_list: boards_list})
            }
        }
    })
})


// Get 5 newest articles
router.get('/newest', (req, res, next) => {
    let sql = `SELECT postId,title,date FROM posts ORDER BY date DESC LIMIT ${config.NEWEST_FORUM_POST_NUM}`
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log("ERROR:", err.message)
        } else {
            if (rows) {
                let temp_list = []
                console.log("kkk")
                for (let row of rows) {
                    let obj = {
                        postId: row['postId'],
                        title: row['title'],
                        date: date_format_transform(row['date'])
                    }
                    temp_list.push(obj)
                }
                return res.json(temp_list)
            }
        }
        console.log("kkk")
        return res.json({})
    })
})


// let sql = 'SELECT boardId,boardname FROM boards'
// let params = []
//
// db.all(sql,params,(err,rows)=>{
//     if(err){
//         console.log("ERROR:",err.message)
//         return res.render('forum')
//     } else{
//         if(rows){
//             let return_list = []
//             // let wait_times = rows.length
//             for (let row of rows){
//                 let boardId = row['boardId']
//                 let boardname = row['boardname']
//
//                 let sql2 = 'SELECT postId,title FROM posts WHERE boardId=?'
//                 let params2 = [boardId]
//
//                 db.all(sql2,params2,(err,posts_rows)=>{
//                     if(err){
//                         console.log("ERROR:",err.message)
//                     } else{
//                         if(posts_rows){
//                             return_list.push(posts_rows)
//                         }
//                     }
//                     // wait_times--
//                 })
//             }
//             // while (wait_times>0){
//             // }
//             console.log("return_list:",return_list)
//             return res.render('forum',{boards:return_list})
//         } else{
//             return res.render('forum')
//         }
//     }
// })


router.get('/read/:id', (req, res) => {
    let post_id = req.params.id

    let sql = 'SELECT title,content,username FROM posts,users WHERE posts.postId = ?'
    let params = [post_id]

    db.get(sql, params, (err, row) => {
            if (err) {
                console.log('ERROR:', err.message)

            } else {
                if (row) {
                    return res.render('forum/post', {
                        postExists: 1,
                        postTitle: row['title'],
                        postContent: row['content'],
                        postUsername: row['username']
                    })
                }
            }
            return res.render('forum/post', {postExists: 0})
        }
    )
})

module.exports = router;