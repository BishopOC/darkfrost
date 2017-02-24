var axios = require('axios');
var apiKey = require('./secrets').darkskyAPIKey;
// console.log(apiKey);
var url = `https://api.darksky.net/forecast/${apiKey}/37.8267,-122.4233`;
// var sample = require('./sampleModule');
// console.log(sample);
// sample.b();
// cheese.a();
// var promiseOfData = axios.get(url);
// promiseOfData
//     .then(function(response){
//       console.log(response.data);
//     }) //success part
//     .catch(function(err){
//       console.log(err);
//     }); //failure or error part
axios.get(url)
     .then(function(response){
       console.log(response.data);
     })
     .catch(function(err){
       console.log(err);
     });
