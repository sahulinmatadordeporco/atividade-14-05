const sqlite = require('sqlite3')
const { open } = require('sqlite')

async function dbConnection() {
    try{
        const db = await open({
            filename: './banco.db',
            driver: sqlite.Database
        })        
        await db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`)

        const usuarios = await db.all(`SELECT * FROM usuarios`)
        console.log(usuarios)

        return db
    }catch(err){
        console.error(err)
    }
}

module.exports = dbConnection
