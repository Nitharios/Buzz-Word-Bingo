/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

let buzzWords = {
  "buzzWords" : []
};

app.use(express.static('public'));

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

app.get('/', (req, res) => {
  res. send('Hello World!');
}).listen(8888);