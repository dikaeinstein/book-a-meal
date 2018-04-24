import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

// Set up express app
const app = express();

const port = process.env.PORT || 5000;

// Log incoming requests
app.use(logger('combined'));

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Root handler
app.get('/', (req, res) => {
	return res.status(200).json({
		message: 'Welcome to Book-A-Meal',
		status: 'success',
	});
});

// catch all error handler
// Will print stack trace in development
app.use((err, req, res, next) => {
	res
		.status(err.statusCode || 500)
		.json((app.get('env') === 'development') ?
		{
			status: 'error',
			message: err.message,
			stack: err.stack,
		}
		:
		{
			status: 'error',
			message: err.message,
		});
	});

// Start server
app.listen(port, () => { 
	console.log(`Express server listening on ${port}`);
});

export default app;
