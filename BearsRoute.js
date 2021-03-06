const express = require('express')
const knex = require('knex');
const knexConfig = {
  client: "sqlite3",
  connection:{
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true,
}

const db = knex(knexConfig);
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const bears = await db('bears');
      res.status(200).json(bears)
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //GET SINGLE bear
  router.get('/:id', async (req, res) => {
    try {
      const bear = await db('bears').where({id: req.params.id}).first();
      res.status(200).json(bear)
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //CREATE bear
  router.post('/', async (req, res) => {
    try {
      const [id] = await db('bears').insert(req.body);
      const bear = await db('bears').where({id}).first();
      res.status(200).json(bear)
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //UPDATE bear
  router.put('/:id', async (req, res) => {
    try {
      const count = await db('bears').where({id: req.params.id}).update(req.body);
      if(count > 0){
        const bear = await db('bears').where({id: req.params.id}).first();
        res.status(200).json(bear);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //DELETE bear
  router.delete('/:id', async (req, res) => {
    try {
      const count = await db('bears').where({id: req.params.id}).del();
      if(count> 0){
        res.status(204).end();
      } else{
        res.status(404).json({message: "bear not found"})
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });





module.exports = router
