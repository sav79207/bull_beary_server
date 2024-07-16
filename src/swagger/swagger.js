const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'Your API Description',
        },
        servers: [
            {
                url: 'https://s0x.fun/api',
            },
        ],
    },
    apis: [
        '/var/www/s0x.fun/api/src/routes/*.js',
    ],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;