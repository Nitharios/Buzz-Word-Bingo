/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const PORT = process.env.PORT || 7777;
const bodyParser = require('body-parser');
const express = require('express');
// const helpers = require('./helpers');

const app = express();

const validAction = { "success" : true };
const invalidAction = { "success" : false };
let buzzWordArray = [];
let score = 0;

app.use(bodyParser.urlencoded({ "extended" : false }));

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
  console.log(buzzWordArray);
 
  res.send(validAction);
});

app.put('/buzzword', (req, res) => {
  for (let i = 0; i < buzzWordArray.length; i++) {
    if (buzzWordArray[i].buzzWord === req.body.buzzWord) {
      buzzWordArray[i].heard = true;
      score += Number(buzzWordArray[i].points);

      console.log(buzzWordArray);
      res.send({
        "success" : true,
        newScore : score
      });
    }
  }
  res.send(invalidAction);
});

app.delete('/buzzword', (req, res) => {
  for (let i = 0; i < buzzWordArray.length; i++) {
    if (buzzWordArray[i].buzzWord === req.body.buzzWord) {
      buzzWordArray.splice(i, 1);
      console.log(buzzWordArray);

      res.send(validAction);
    }
  }  
  
  res.send(invalidAction);
});

app.post('/reset', (req, res) => {
  buzzWords = [];

  console.log(buzzWords);
  res.send(validAction);
});
