const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3316,
    username: 'ebooks2',
    password: 'WsYFc5i4haY5CBiF',
    database: 'ebooks2',
    timezone: '+08:00',
    pool: {
        max: 10,
        min: 0,
    },
    logging: false
});
module.exports = sequelize
