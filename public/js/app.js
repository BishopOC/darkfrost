var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 1000000,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy',
    apparentTemperature: 67.4,
    precipProbability : 0.30,
    humidity: 0.61,
    location:[],
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    }
  },
  created: function(){
    axios.get('/weather/29.7,-82.4')
         .then(function(response){
           currentlyWidget.time = response.data.currently.time;
           currentlyWidget.summary = response.data.currently.summary;
           currentlyWidget.icon = response.data.currently.icon;
           currentlyWidget.apparentTemperature = response.data.currently.apparentTemperature;
           currentlyWidget.precipProbability = response.data.currently.precipProbability;
           currentlyWidget.humidity = response.data.currently.humidity;
         })
         .catch(function(err){
           console.log(err);
         });
    axios.get('/location/29.7,-82.4')
         .then(function(response){
           currentlyWidget.location = response.data.results[1].formatted_address;
           console.log(currentlyWidget.location);
           console.log(response.data);
         });
  }
});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    icon: 'partly-cloudy',
    summary: 'partly cloudy'
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    }
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
         .then(function(response){
           dailyWidget.icon = response.data.daily.icon;
           dailyWidget.summary = response.data.daily.summary;

         });
  }
});
