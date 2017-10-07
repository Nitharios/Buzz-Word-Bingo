/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res. send('Hello World!');
}).listen(8888);