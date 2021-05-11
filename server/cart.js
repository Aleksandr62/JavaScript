const fs = require('fs');
const cart = require('./cart');
const stat = require('./stat.js'); //////////////////

const add = (cart, req) => {
  cart.push(req.body);
  //stat(req.body, '../server/db/stat.json'); ///////////////////
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  //stat(find, '../server/db/stat.json'); ///////////////////  
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
  const find = cart.find(el => el.id_product === +req.params.id);
  cart.splice(cart.indexOf(find), 1);
  //stat(find, '../server/db/stat.json'); ///////////////////    
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
