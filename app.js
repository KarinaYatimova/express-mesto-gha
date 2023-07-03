const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  max: 100, // limit each IP to 100 request
  windowMs: 15 * 60 * 1000, // 15 min
  message: 'Too many request from this IP, please try again after 15 min',
});

app.use(limiter);

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected to mestodb');
  });

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(routes);
app.use(helmet());
app.disable('x-powered-by');

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
