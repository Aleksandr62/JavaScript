const express = require('express');
const fs = require('fs');
const handler = require('./handler.js');
const stat = require('./stat.js');
const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('../server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  handler(req, res, 'add', '../server/db/userCart.json');
  stat(req, 'add', '../server/db/stat.json');  
});
// localhost:3000/api/cart/123 // req.params.id
// localhost:3000/api/cart/?var1='sfsf'&var2='ada' // req.query
router.put('/:id', (req, res) => {
  handler(req, res, 'change', '../server/db/userCart.json');
  stat(req, 'change', '../server/db/stat.json');    
});
router.delete('/:id', (req, res) => {
  handler(req, res, 'delete', '../server/db/userCart.json');
  stat(req, 'delete', '../server/db/stat.json');     
});

module.exports = router;
