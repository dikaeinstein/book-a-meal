import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

// Set up express app
const app = express();

const port = process.env.PORT || 5000;

// Log incoming requests
app.use(logger('combined'));

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

// Root handler
app.get('/', (req, res) => (
  res.status(200).json({
    message: 'Welcome to Book-A-Meal',
  })
));

// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
