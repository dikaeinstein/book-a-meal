import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from './routes';

dotenv.config();

// Set up express app
const app = express();
// API documentation
const swaggerDocument = YAML.load('swagger.yml');

const port = process.env.PORT || 5000;

// Log incoming requests
app.use(logger('combined'));

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

// Serve API docs on root path
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch all error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    message: 'Something failed, we are working on it :)',
    status: 'error',
  });
});

/* eslint no-console: 0 */
// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
