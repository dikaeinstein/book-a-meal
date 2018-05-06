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
// Serve API docs
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root handler
app.get('/', (req, res) => (
  res.status(200).json({
    message: 'Welcome to Book-A-Meal',
    status: 'success',
  })
));

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

// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
