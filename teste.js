const sqlite3 = require('sqlite3').verbose();
let db;

function conectar() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('banco.db', (err) => {
      if (err) return reject(err);
      console.log('🗄️  Conectado ao SQLite');
      db.run(`
        CREATE TABLE IF NOT EXISTS usuario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          email TEXT UNIQUE,
          senha TEXT
        )
      `, resolve);
    });
  });
}

function criarUsuario(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this); 
    });
  });
}

module.exports = { conectar, criarUsuario };
