/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const PORT = process.env.PORT || 7777;
const bodyParser = require('body-parser');
const express = require('express');
const helpers = require('./helpers');

const app = express();

const validAction = { "success" : true };
const invalidAction = { "success" : false };
let buzzWordArray = [];
let score = 0;
let returnValue;

app.use(bodyParser.urlencoded({ "extended" : false }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('Activity detected');
  res.send('Hello World!');
}).listen(PORT);

app.post('/reset', (req, res) => {
  buzzWords = [];

  console.log(buzzWords);
  res.send(validAction);
});

app.get('/buzzwords', (req, res) => {
  res.json({
    'buzzWord' : buzzWordArray
  });
});

app.route('/buzzword')
  .post((req, res) => {

    returnValue = helpers.buzzWordChecker(req, buzzWordArray);

    if (returnValue !== -1) {
      res.send(invalidAction);

    } else {
      buzzWordArray.push(req.body);
      console.log(buzzWordArray);
      res.send(validAction);
    }
  })

  .put((req, res) => {

    index = helpers.buzzWordChecker(req, buzzWordArray, true);

    if (index === -1) {
      res.send({
        "success" : false,
        newScore : score
      });

    } else {
      buzzWordArray[index].heard = true;
      score += Number(buzzWordArray[index].points);

      console.log(buzzWordArray);
      res.send({
        "success" : true,
        newScore : score
      });
    }
  })

  .delete((req, res) => {

    index = helpers.buzzWordChecker(req, buzzWordArray, true);
    console.log(index);

    if (index === -1) {
      res.send(invalidAction);

    } else {
      buzzWordArray.splice(index, 1);
      
      console.log(buzzWordArray);
      res.send(validAction);
    }
  });