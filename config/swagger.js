import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Exemple API',
      version: '1.0.0',
      description: 'Documentation API pour le service Exemple',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/exemple/*.js', './models/*.js'],
};

export default swaggerJsdoc(options);
