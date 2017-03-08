var express = require('express');
var server =  express();
var port = process.env.PORT || 8080;
var apiKey = process.env.DARK_API || require('./secrets').darkskyAPIKey;
var googleKey = process.env.GOOG_API || require('./secrets').googleAPIKey;
var axios = require('axios');

server.use(express.static(__dirname + '/public'));

server.get('/', function(request,response){
  response.sendFile('index.html', {root: __dirname + '/public/html'});
});
server.get('/weather/:lat,:lon', function(request,response){
  var lat = request.params.lat;
  var lon = request.params.lon;
  var url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`;
  axios.get(url)
       .then(function(results){
         response.send(results.data);
       })
       .catch(function(err){
         console.log(err);
       });
     });

     server.get('/location/:address', function(request, response){
       var address = request.params.address;
       var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`;
       axios.get(url)
            .then(function(results){
              response.send(results.data);
            })
            .catch(function(err){
              response.send(err);
            });
     });

server.listen(port, function(){
  console.log('Now listening on port...', port);
});
