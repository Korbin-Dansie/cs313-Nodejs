const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const path = require('path');
var fs = require('fs');

function HTMlPage(req, res){
  console.log("Current path is: "+ path.join(__dirname));

  fs.readFile(path.join(__dirname, 'templatefile.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err.name + ': ' + err.message);
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write("<h1>Hello World</h1>");
      res.end();
      return;
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(data);
    res.end();
  });

}
//Different type of requests
// app.all('/Destination', function (req, res, next){})
app.get('/', HTMlPage)

app.post('/', function () {
  res.send('Got a POST request')
})
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
//express.static(root, [options])
app.use(express.static('public')) // http://localhost:8888/K.png
//app.use('/static', express.static('public')) // http://localhost:8888/static/K.png

// Safer option
/*
app.use('/static', express.static(path.join(__dirname, 'public')))
*/
//var __dirname = 'week8';
app.use('/static', express.static(path.join(__dirname, 'public')))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
