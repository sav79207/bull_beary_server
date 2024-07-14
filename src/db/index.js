const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,  // Вимкнення журналювання SQL запитів у консолі
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize