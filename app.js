const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected to mestodb');
  });

app.use((req, res, next) => {
  req.user = {
    _id: '648e2670a04a5e78d6338a2f',
  };

  next();
});

app.use(bodyParser.json()); // для собирания JSON-формата

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
