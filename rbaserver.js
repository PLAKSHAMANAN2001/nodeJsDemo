var express = require('express');
//var myParser = require("body-parser");
var app = express();
var fs = require("fs");

app.get('/listallbpayagent', function (req, res) {
   fs.readFile( __dirname + "/" + "rbabpay.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var agents = {

    "bpayagent4" :{
        "bpay_id": 44444,
        "bpay_Name":"StGeorge",
        "BilderCode":4513,
        "CRN":5909478473,
        "PayAmount":1111.33,
        "PayMethod":"Savings"
    }
}

//app.use(myParser.json({extended : true}));
app.post('/addbpayagent', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "rbabpay.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["bpayagent4"] = agents["bpayagent4"]; 
       //data = JSON.parse( data );
       // write data to file sample.html
       	var jsonContent = JSON.stringify(data);
			fs.writeFile('rbabpay.json',jsonContent, 'utf8',
			    // callback function that is called after writing file is done
			    function(err) {        
			        if (err) throw err;
			        // if no error
			        console.log("Data is written to file successfully.")
			});    
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.get('/:bpay_id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "rbabpay.json", 'utf8', function (err, data) {
      var agents = JSON.parse( data );
      var agent = agents["bpayagent" + req.params.bpay_id] 
      console.log( agent );
      res.end( JSON.stringify(agent));
   });
})

var id = 2;

app.delete('/deletebpay', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "rbabpay.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["bpayagent" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(9999, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})