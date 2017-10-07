/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const PORT = process.env.PORT || 8888;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

let buzzWords = {
  "buzzWords" : []
};
let score = '';

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('Activity detected');
  res.send('Hello World!');
}).listen(PORT);

app.get('/buzzwords', (req, res) => {
  res.send(buzzWords);
});

app.post('/buzzword', (req, res) => {

});

app.post('/reset', (req, res) => {

});

app.put('/buzzword', (req, res) => {

});

app.delete('/buzzword', (req, res) => {
  buzzWords = {
    "buzzWords" : []
  };
});
