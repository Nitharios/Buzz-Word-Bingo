/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const PORT = process.env.PORT || 7777;
const bodyParser = require('body-parser');
const express = require('express');
// const helpers = require('./helpers');

const app = express();

let buzzWordArray = [];
let score = '';

app.use(bodyParser.urlencoded({"extended" : false}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('Activity detected');
  res.send('Hello World!');
}).listen(PORT);

app.get('/buzzwords', (req, res) => {
  res.json({
    'buzzWord' : buzzWordArray
  });
});

app.post('/buzzword', (req, res) => {
  buzzWordArray.push(req.body);
  res.send({
    "success" : true
  });
  console.log(buzzWordArray);
});

app.put('/buzzword', (req, res) => {
  for (let i = 0; i < buzzWordArray.length; i++) {
    if (buzzWordArray[i].buzzWord === req.body.buzzWord) {
      buzzWordArray[i].heard = true;
      console.log(buzzWordArray);
      res.send({
        "success" : true,
        "newScore" : 'It works'
      });
    }
  }
  res.end();
  return false;
});

app.delete('/buzzword', (req, res) => {
  for (let i = 0; i < buzzWordArray.length; i++) {
    if (buzzWordArray[i].buzzWord === req.body.buzzWord) {
      buzzWordArray.splice(i, 1);
      console.log(buzzWordArray);
      res.send({"success" : true});
      return true;
    }
  }  
  res.end();
  return false;
});

app.post('/reset', (req, res) => {
  buzzWords = [];
  console.log(buzzWords);
  res.end();
});
