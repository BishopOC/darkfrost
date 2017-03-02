var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 0,
    summary: ' ',
    icon: ' ',
    apparentTemperature: 0,
    precipProbability : 0,
    humidity: 0,
    location:' ',
    latitude: '',
    longitude: '',
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },
    getWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
        axios.get(url)
             .then(function(response){
               currentlyWidget.time = response.data.currently.time;
               currentlyWidget.summary = response.data.currently.summary;
               currentlyWidget.icon = response.data.currently.icon;
               currentlyWidget.apparentTemperature = response.data.currently.apparentTemperature;
               currentlyWidget.precipProbability = response.data.currently.precipProbability;
               currentlyWidget.humidity = response.data.currently.humidity;
               console.log(response.data);
             })
             .catch(function(err){
               console.log(err);
             });
        axios.get(`/location/${lat},${lon}`)
             .then(function(response){
               currentlyWidget.location = response.data.results[2].formatted_address;
             });
    },
    updateWeather: function(){
      this.getWeather(this.latitude, this.longitude);
    }
  },

  created: function(){
  this.getWeather(29.4, -81.6);

  },


});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    icon: ' ',
    summary: ' '
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
