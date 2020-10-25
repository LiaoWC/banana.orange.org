var sqlite3 = require('sqlite3').verbose() // database
var md5 = require('md5') // security

const DB_SOURCE = 'database/db.sqlite'
// const DB_SOURCE = ':memory:'

const INIT_QUERY = `
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username text UNIQUE,
        email text UNIQUE,
        password text
    );`

const SECOND_QUERIES = [`
    CREATE TABLE todos(
        todoId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        state INTEGER NOT NULL,
        content TEXT NOT NULL,
        deadline TEXT NOT NULL   
    )`, `
    CREATE TABLE boards(
        boardId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        boardname TEXT NOT NULL UNIQUE,
        userId INTEGER NOT NULL
    )`, `
    CREATE TABLE posts(
        postId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        boardId INTEGER NOT NULL,
        title TEXT NOT NULL,
        authorId TEXT NOT NULL,
        date TEXT NOT NULL,
        content TEXT
    )`, `
    CREATE TABLE comments(
        commentId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        postId INTEGER NOT NULL,
        userId TEXT NOT NULL,
        comment TEXT NOT NULL
    )`, `
    CREATE TABLE assigned_tasks(
        taskId INTEGER PRIMARY KEY AUTOINCREMENT,
        assignerId INTEGER NOT NULL,
        state INTEGER NOT NULL,
        content TEXT NOT NULL,
        deadline TEXT NOT NULL
    )`, `
    CREATE TABLE assigned_task_collaborator(
        collaboratorId INTEGER PRIMARY KEY AUTOINCREMENT,
        taskId INTEGER NOT NULL,
        collaborator TEXT NOT NULL
    )`, `
    CREATE TABLE work_time(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        starttime TEXT NOT NULL,
        stoptime TEXT NOT NULL
    )`, `
    CREATE TABLE task_assign(
        taskId INTEGER PRIMARY KEY AUTOINCREMENT,
        assignerId INTEGER NOT NULL,
        state INTEGER NOT NULL,
        content TEXT NOT NULL,
        deadline TEXT NOT NULL,
        collaborators TEXT NOT NULL
    )`,
    `INSERT INTO boards(boardname,userId) VALUES('Food Recommendation',1);`,
    `INSERT INTO boards(boardname,userId) VALUES('Exercise',1);`,
    `INSERT INTO boards(boardname,userId) VALUES('Technology Area',1);`,
    `INSERT INTO posts(boardId,title,authorId,date,content)
    VALUES (1,'What food do you recommend in Hsinchu?',1,'20201023','As the title said, who could recommend me some delicious food?');`,
    `INSERT INTO posts(boardId,title,authorId,date,content)
    VALUES (2,'How to get muscle efficiently?',1,'20201022','');`,
    `INSERT INTO posts(boardId,title,authorId,date,content)
    VALUES (3,'What do you think about the new Deep Learning algorithm?',1,'20201023','');`,
    `INSERT INTO posts(boardId,title,authorId,date,content)
    VALUES (3,'Last update of Ubuntu',1,'20201024','My Ubuntu crashed after I update!');`,
    `INSERT INTO posts(boardId,title,authorId,date,content)
    VALUES (3,'Who could help me solve this problem?',1,'20201024','......');`,
    `INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
    1,1,'Build the environment.','11/13','Jason, Kevin');`,
    `INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
    1,1,'Improve the search algorithm.','11/15','Leo, Amy');`,
    `INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
    1,1,'Prepare for the next activity.','11/25','Joey, Kathy');`,
    `INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
    1,1,'Help tech department to resolve some problems.','11/29','Mose, Kevin');`,
    `INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
    1,0,'Finish the new project.','11/21','Mose, Jim');`,
    `INSERT INTO task_assign(assignerId,state,content,deadline,collaborators) VALUES(
    1,0,'Create an APP.','11/29','Ella, Carmen');`,
    `INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Build the environment in docker.','10231800');`,
    `INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Write a paper.','12052100');`,
    `INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Deal with the pull request.','10260900');`,
    `INSERT INTO todos(userId,state,content,deadline) VALUES(1,0,'Prepare for the meeting.','10301000');`
];


let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connecting to the database.')
        db.run(INIT_QUERY, (err) => {
                if (err) {
                    // Table is already created.
                    console.log("Successfully! Table has been created before. If your find your db has something wrong, suggest you delete it and re-create.\n")
                } else {
                    // Table is just created.
                    var insert_user = 'INSERT INTO users (username,email,password) VALUES (?,?,?)'
                    db.run(insert_user,
                        ['admin', 'admin@example.com', md5("admin")]
                    )
                    console.log("Successfully!\nDatabase is just created. Automatically insert an admin user.\n")
                    db.serialize(function () {
                        for (let i = 0; i < SECOND_QUERIES.length; i++) {
                            db.run(SECOND_QUERIES[i], (err) => {
                                if (err) {
                                    console.log("ERROR:", err.message)
                                }
                            })
                        }
                    })

                }
            }
        )
    }

})
module.exports = db