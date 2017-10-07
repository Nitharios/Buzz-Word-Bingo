/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const PORT = process.env.PORT || 7777;
const bodyParser = require('body-parser');
const express = require('express');
const helpers = require('./helpers');

const validAction = { "success" : true };
const invalidAction = { "success" : false };
let buzzWordArray = [];
let score = 0;
let index, returnValue;

const app = express();
// setting value to false forces the value in a key-value pair to be a string or an array
app.use(bodyParser.urlencoded({ "extended" : true }));
// combines req.url with the provided root directory 'public'
// automatically defaults to index.html
app.use(express.static('public'));
app.listen(PORT);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   let err = new Error('Not Found!');
//   err.status = 404;
//   next(err);
// }); 

app.post('/reset', (req, res) => {
  
  if (!req.body || !req.reset || req.reset !== true) {

    return res.json(invalidAction);

  } else {

    buzzWordArray = [];
    score = 0;
    console.log(buzzWordArray);
    // .json is identical to .send but will convert non-objects such as null and undefined, which are invalid as JSON
    // can take advantage of json replacer and json spaces to format JSON
    res.json(validAction);
  }
});

app.get('/buzzwords', (req, res) => {
  res.json({
    'buzzWord' : buzzWordArray
  });
});

app.route('/buzzword')

  .post((req, res) => {

    if (!req.body || !req.body.buzzWord ||
      !req.body.points || !req.body.heard || req.body.heard !== false)  {
      
      return res.json(invalidAction);
    
    } else {
      returnValue = helpers.buzzWordChecker(req, buzzWordArray);

      if (buzzWordArray.length >= 5) {
        res.json(invalidAction);
      
      } else {
        if (returnValue !== -1) {
          res.json(invalidAction);

        } else {
          buzzWordArray.push(req.body);
          console.log(buzzWordArray);
          res.json(validAction);
        }      
      }
    }
  })

  .put((req, res) => {

    if (!req.body || !req.body.buzzWord ||
      !req.body.heard) {
      
      return res.json(invalidAction);
    
    } else {

      index = helpers.buzzWordChecker(req, buzzWordArray, true);

      if (index === -1) {
        res.json({
          "success" : false,
          newScore : score
        });

      } else {
        buzzWordArray[index].heard = true;
        score += Number(buzzWordArray[index].points);

        console.log(buzzWordArray);
        res.json({
          "success" : true,
          newScore : score
        });
      }
    }
  })

  .delete((req, res) => {

    if (!req.body || !req.body.buzzWord) {

      return res.json(invalidAction);

    } else {

      index = helpers.buzzWordChecker(req, buzzWordArray, true);
      console.log(index);

      if (index === -1) {
        res.json(invalidAction);

      } else {
        buzzWordArray.splice(index, 1);
        
        console.log(buzzWordArray);
        res.json(validAction);
      }
    }
  });