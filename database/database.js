var sqlite3 = require('sqlite3').verbose() // database
var md5 = require('md5') // security

const DB_SOURCE = 'database/db.sqlite'
// const DB_SOURCE = ':memory:'

const INIT_QUERY = `
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username text,
        email text UNIQUE,
        password text
    );`

const SECOND_QUERIES = [`
    CREATE TABLE todos(
        todoId INTEGER PRIMARY KEY NOT NULL,
        userId INTEGER NOT NULL,
        state INTEGER NOT NULL,
        content TEXT NOT NULL,
        deadline TEXT NOT NULL   
)`,
`
    CREATE TABLE screenshot(
        imgId INTEGER PRIMARY KEY NOT NULL,
        group TEXT NOT NULL,
        date TEXT NOT NULL,
        dataURL TEXT NOT NULL   
`
]


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
                    for (let i = 0 ;i<SECOND_QUERIES.length;i++){
                        db.run(SECOND_QUERIES[i],(err)=>{
                            if(err){
                                console.log("ERROR: Some error occur in second queries.")
                            }
                        })
                    }
                }
            }
        )
    }

})




module.exports = db