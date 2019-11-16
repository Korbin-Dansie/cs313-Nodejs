/************************************************************
* By: Korbin Dansie
* Port number : 8888
* Home page : http://localhost:8888/home
  - Async Reads templatefile.html
  - If file not detected just print Hello World
************************************************************/
var http = require('http');
var fs = require('fs');
var url = require('url');
const PORT = process.env.PORT || 5000;
console.log("Env:" + process.env.PORT);

//process.env.PORT ||

function onRequest (req, res) {
  console.log("Received a request for:" + req.url);
  if(req.url == "/home"){
    fs.readFile('templatefile.html', 'utf8', (err, data) => {
      if (err) {
//        console.error(err.name + ': ' + err.message);
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
  else if (req.url == "/getData") {
    var data = {
      name: "korbin Dansie",
      class: "cs313"
    };
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(data));
    res.end();
  }
  else {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.write("Page Not Found");
    res.end();
  }
  console.log("End onRequest");
}

var server = http.createServer(onRequest);
server.listen(PORT);
console.log("Listing for port:" + PORT);
