// server.js
// load the things we need
var express = require('express');
const path = require('path');
var fs = require('fs');
var app = express();
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
function readIndexFile (req, res){
  //console.log("Current path is: "+ path.join(__dirname));
  fs.readFile(path.join(__dirname, 'views/pages/index.html'), 'utf8', (err, data) => {
    if (err) {
      //console.error(err.name + ': ' + err.message);
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write("Error Unable To read file");
      res.end();
      return;
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(data);
    res.end();
  });
}

function calculateRate(mailType, weight){

  switch (Number(mailType)) {
    /*********************
    * Letters (Stamped)
    *********************/
    case 1:
    if(weight <= 1){
      return 0.55;
    }
    else if(weight <= 2){
      return 0.70;
    }
    else if (weight <= 3){
      return 0.85;
    }
    else if (weight <= 3.5){
      return 1;
    }
    else{
      //The package is too heavy and you need to see large prices
      console.log("Letters (Stamped) weight is too heavy");
      return "See Large Envelopes prices";
    }
    break;

    /*********************
    * Letters (Metered)
    *********************/
    case 2:
    if(weight <= 1){
      return 0.50;
    }
    else if(weight <= 2){
      return 0.65;
    }
    else if (weight <= 3){
      return 0.80;
    }
    else if (weight <= 3.5){
      return 0.95;
    }
    else{
      //The package is too heavy and you need to see large prices
      console.log("Letters (Metered) weight is too heavy");
      return "See Large Envelopes prices";
    }
    break;

    /*********************
    * Large Envelopes (Flats)
    *********************/
    case 3:
    if(weight < 1){
      return 1;
    }
    else if(weight <= 13){
      return 1 + ((weight - 1) * 0.15);
    }
    else{
      console.log("Large Envelope weight is to heavy");
      return "Large Envelope weight is to heavy";
    }
    break;

    /*********************
    * First-Class Package Service—Retail
    *********************/
    case 4:
    return -1;
    break;


    default:
    console.error("Invalid mail type");
    console.error("Mail Type: " + mailType + "\nWeight: " + weight);
    return "Error Mail Type or Weight invalid";
    break;
  }
}
// index page
app.get('/', readIndexFile);
// about page
app.get('/getData', function(req, res) {
  var vaildInputs = true;
  //Get the weight
  var weight = req.query.Weight;
  //Get what mail type they inputed
  var mailOption = req.query.MailOption;
  console.log("/GetData\nMail Type: " + mailOption + "\nWeight: " + weight);

  //Check if Weight and mailOptions are valid
  if(isNaN(weight) || weight < 0){
    vaildInputs = false;
  }
  if(isNaN(mailOption)){
    vaildInputs = false;
  }

  var cost = calculateRate(mailOption, weight);
  //If cost is Not a Number return to index page
  if(isNaN(cost) || cost == -1){
    vaildInputs = false;
  }

  if(vaildInputs == false){
    res.writeHead(302, {
      'Location': '/'
      //add other headers here...
    });
    res.end();
    return;
  }

  res.render('pages/displayRate',
  {
    cost: cost
  });
});


// about page
app.get('/about', function(req, res) {
});

app.listen(port);
console.log("listening on port " + port);
