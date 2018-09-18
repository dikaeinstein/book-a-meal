import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import setupWebpackDev from './lib/setupWebpackDev';
import routes from './routes';

dotenv.config();

// Set up express app
const app = express();

// Set up webpackDevServer and hmr
const root = setupWebpackDev(app);

// Enable CORS Pre-Flight on all routes
app.use(cors());

// Log incoming requests
app.use(logger('combined'));

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, root)));

app.use('/api', routes);

app.get('*', (req, res) => (
  res.sendFile(path.join(__dirname, `${root}/index.html`))
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

export default app;
