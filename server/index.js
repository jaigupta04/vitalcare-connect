const express = require('express');
const cors    = require('cors');

const app = express();

const Data = require('./data');

const corsOptions = {
  origin: 'https://vitalcare-connect.vercel.app',
};

app.use(express.json());
app.use(cors(corsOptions));


app.get('/api/test', async (req, res) => {

  res.send('Hello World!');

});

app.get('/api/getall', async (req, res) => {

  const { collection } = req.query;

  const resp = await Data.getAll(collection);

  res.send(resp);
});

app.post('/api/signup', async (req, res) => {
  
  const { username, ...data} = req.body;
  
  await Data.getSignup(username, data);

  res.sendStatus(201);
})

app.post('/api/apts', async (req, res) => {
  
  const data = req.body;
  
  await Data.bookApt(data);

  res.sendStatus(201);
})

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

module.exports = app;
