const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

// Налаштування підключення до бази даних
const sequelize = new Sequelize('mysql://root:27746613@localhost:3306', {
    logging: false,
});

// Зчитування SQL-запитів з файлу
const setupSQL = fs.readFileSync(path.join(__dirname, 'db-setup.sql'), 'utf8');

// Виконання SQL-запитів по черзі
const queries = setupSQL.split(';').filter(query => query.trim() !== '');

(async () => {
    try {
        for (const query of queries) {
            await sequelize.query(query);
        }
        console.log('Database & tables created successfully!');
    } catch (err) {
        console.error('Error creating database & tables:', err);
    } finally {
        sequelize.close();
    }
})();