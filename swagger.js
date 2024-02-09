const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes API',
    description: 'API for recipes'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);