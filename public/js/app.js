
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
    },
    currentTime: function(seconds){
      var date = new Date(seconds * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var dayNumber = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var day = date.getDay();
      var weekday = new Array(7);
      weekday[0] =  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      var dayName = weekday[date.getDay()];
      return `${dayName} ${month + 1}/${dayNumber} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
    }
  },

  created: function(){
  this.getWeather(29.6, -82.3);

  },


});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    icon: 'clear-night',
    summary: 'blahblah ',
    latitude: '',
    longitude:'',
    days: []
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },

    dailyTime: function(seconds){
      var date = new Date(seconds * 1000);
      var day = date.getDay();
      var weekday = new Array(7);
      weekday[0] =  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      var dayName = weekday[date.getDay()];
      return `${dayName}`;
    },

    getDailyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
           .then(function(response){
             var dailyData = response.data.daily;
             this.icon = dailyData.icon;
             this.summary = dailyData.summary;
             this.days = dailyData.data;

          }.bind(this))
           .catch(function(err){
             console.log(err);
           });
    },
    updateWeather: function(){
      this.getDailyWeather(this.latitude, this.longitude);
    },
  },

  created: function(){
    this.getDailyWeather(29, -80);
  }
});

var hourlyWidget = new Vue({
  el: '#hourly',
  data : {
    summary: 'it gon rain',
    icon: 'clear-night',
    latitude: '',
    longitude:'',
    hours: []
  },
  methods: {
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
      return `${month + 1}/${day} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
    },
    getHourlyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
           .then(function(response){
             var hourlyData = response.data.hourly;
            //  console.log(hourlyData);
             this.summary = hourlyData.summary;
             this.icon = hourlyData.icon;
             this.hours = hourlyData.data;

           }.bind(this))
           .catch(function(err){
             console.log(err);
           });
    },
    updateWeather: function(){
      this.getHourlyWeather(this.latitude, this.longitude);
    },
  },
  created: function (){
    this.getHourlyWeather(29.1,-80.1);
  }
});

var minutelyWidget = new Vue({
  el: '#minutely',
  data: {
    icon: 'icon',
    precipProbability: 0,
    latitude: '',
    longitude:'',
    minutes: []
  },
  methods: {
    urlIcon: function(icon){
      return `/images/${icon}.png`;
    },
    getMinutelyWeather: function (lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
           .then(function(response){
             var minutelyData = response.data.minutely;
             this.icon = minutelyData.icon;
             this.precipProbability = minutelyData.precipProbability;
             this.minutes = minutelyData.data;
             console.log(response.data);
           }.bind(this))
           .catch(function(err){
             console.log(err);
           });
    },
    getTime: function(seconds){
      var date = new Date(seconds * 1000);
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${hour}:${minutes < 9 ? '0' + minutes: minutes}`;
    },
    updateWeather: function(){
      this.getMinutelyWeather(this.latitude, this.longitude);
    },
  },

  created: function(){
    this.getMinutelyWeather(29, -82);
  }

});
