const fs = require('fs');
/* const cart = require('./cart');

const actions = {
  add: cart.add,
  change: cart.change,
  delete: cart.del,
}; */

const stat = (req, action, file) => {
    const newStat = [];
    fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      console.log(JSON.stringify({resultStat: 0, text: err}));
    } else {    
      if(data !== undefined) newStat.push(...JSON.parse(data));  
      newStat.push({date: new Date, name: action === 'change' ? req.body.find.product_name: req.body.product_name, action: `${action}: ${req.body.quantity}`});       
      fs.writeFile(file, JSON.stringify(newStat, null, 2), (err) => {
        if (err) {
            console.log(JSON.stringify({resultStat: 0}));
          //res.send('{"result": 0}');
        } else {
            console.log(JSON.stringify({resultStat: 1}));
          //res.send('{"result": 1}');
        }
      })
    }
  });
};

module.exports = stat;
