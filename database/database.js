var sqlite3 = require('sqlite3').verbose() // database
var md5 = require('md5') // security

const DB_SOURCE = 'database/db.sqlite'

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connecting to the database.')
        db.run(`
            CREATE TABLE users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text,
                department text,
                email text,
                password text
            )`, (err) => {
                if (err) {
                    // Table is already created.
                    console.log("Successfully! Table has been created before.\n")
                } else {
                    // Table is just created.
                    var insert_user = 'INSERT INTO users (name,department,email,password) VALUES (?,?,?,?)'
                    db.run(insert_user,
                        ['admin', 'A', 'admin@example.com', md5("admin")]
                    )
                    console.log("Successfully!\nDatabase is just created. Automatically insert an admin user.\n")
                }
            }
        )
    }

})


module.exports = db