const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = {
  client: "sqlite3",
  connection:{
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true,
}
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
//GET ALL 
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos)
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET SINGLE ZOO
server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos').where({id: req.params.id}).first();
    res.status(200).json(zoo)
  } catch (error) {
    res.status(500).json(error);
  }
});
//CREATE ZOO
server.post('/api/zoos', async (req, res) => {
  try {
    const [id] = await db('zoos').insert(req.body);
    const zoo = await db('zoos').where({id}).first();
    res.status(200).json(zoo)
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE ZOO
//DELETE ZOO
//





const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
