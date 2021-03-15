var knex = require('knex')({
        client: 'mysql',
        connection: {
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'products_manager'
        }
    }
);

module.exports = knex;