const express = require('express');
const cors = require('cors');

const app = express();

const Data = require('../data');

const corsOptions = {
  origin: 'https://readme-gen.web.app',
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/add', async (req, res) => {
  res.send('hi');
})


app.get('/api/generate', async (req, res) => {

  const { githubId, repoName, branchName, fileName } = req.query;
  console.log(req.query)

  const resp = await Data.getReadme(githubId, repoName, branchName, fileName);

  res.send(resp);

});

const port = process.env.PORT  || 8080;

app.listen(port, () => {
  console.log(`Server is up and listening at ${process.env.PORT}`)
});


// module.exports = app;
