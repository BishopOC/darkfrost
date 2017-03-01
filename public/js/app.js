var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue'
  }
});

var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 1000000,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy',
    apparentTemperature: 67.4,
    precipProbability : 0.30,
    humidity: 0.61,
    location: [],
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
         .then(function(response){
           currentlyWidget.time = response.data.currently.time;
           currentlyWidget.summary = response.data.currently.summary;
           currentlyWidget.icon = response.data.currently.icon;
           currentlyWidget.apparentTemperature = response.data.currently.apparentTemperature;
           currentlyWidget.precipProbability = response.data.currently.precipProbability;
           currentlyWidget.humidity = response.data.currently.humidity;
           currentlyWidget.location = response.data.latitude && response.data.longitude;
           console.log(response.data);
         })
         .catch(function(err){
           console.log(err);
         });
  }

});
