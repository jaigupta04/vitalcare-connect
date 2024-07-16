const express = require('express');
const cors    = require('cors');

const app = express();

const Data = require('./data');

// const corsOptions = {
//   origin: <backend url>,
// };

app.use(express.json());
app.use(cors());

app.get('/api/test', async (req, res) => {
  res.send('Hello World!');
})


module.exports = app;
