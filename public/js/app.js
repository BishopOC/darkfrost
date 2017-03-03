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
              //  console.log(response.data);
             })
             .catch(function(err){
               console.log(err);
             });
        axios.get(`/location/${lat},${lon}`)
             .then(function(response){
               currentlyWidget.location = response.data.results[2].formatted_address;
              //  console.log(response.data);
             });
    },
    updateWeather: function(){
      this.getWeather(this.latitude, this.longitude);
    }
  },

  created: function(){
  this.getWeather(29.6, -82.3);

  },


});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    icon: ' ',
    summary: ' ',
    latitude: currentlyWidget.$data.latitude,
    longitude: currentlyWidget.$data.longitude,
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    }
  },
  created: function(){
    axios.get(`/weather/29.6, -82.7`)
         .then(function(response){
           dailyWidget.icon = response.data.daily.icon;
           dailyWidget.summary = response.data.daily.summary;
          console.log(response.data);
         });
  }
});

var hourlyWidget = new Vue({
  el: '#hourly',
  data : {
    summary: 'it gon rain',
    icon: 'clear-night',
    hours: []
  },
  methods: {
    getMainIcon: function(){
      return `images/${this.icon}.png`;
    },
    getHourlyIcon: function(iconString){
      return `images/${iconString}.png`;
    },
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${month + 1}/${day}/${year} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
    },
    getHourlyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
           .then(function(response){
             var hourlyData = response.data.hourly;
             console.log(hourlyData);
             this.summary = hourlyData.summary;
             this.icon = hourlyData.icon;
             this.hours = hourlyData.data;
           }.bind(this))
           .catch(function(err){
             console.log(err);
           });
    }
  },
  created: function (){
    this.getHourlyWeather(29.1,-80.1);
  }
});
