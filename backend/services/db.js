const knex = require('knex');
const db = knex({
  client: 'mysql2',
    connection: {
        host: 'web0164.zxcs.be',
        user: 'adb_seppe',
        password: 'SxrZSDJhWTkzaTtADKKY',
        database: 'adb_project_seppe'
    }
});

module.exports = db;