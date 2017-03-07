// jshint -W119

var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 0,
    summary: ' ',
    icon: ' ',
    apparentTemperature: 0,
    precipProbability : 0,
    humidity: 0,
    location:'Gainesville, 32605',
    local: '',
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },
    getWeather: function(local){
      var url = `/location/${local}`;
        axios.get(url)
             .then(function(response){
               var axiosLon = response.data.results[0].geometry.location.lng;
               var axiosLat = response.data.results[0].geometry.location.lat;
               currentlyWidget.location = response.data.results[0].formatted_address;
              return axios.get(`/weather/${axiosLat},${axiosLon}`)
              .then(function(response){
                currentlyWidget.time = response.data.currently.time;
                currentlyWidget.summary = response.data.currently.summary;
                currentlyWidget.icon = response.data.currently.icon;
                currentlyWidget.apparentTemperature = response.data.currently.apparentTemperature;
                currentlyWidget.precipProbability = response.data.currently.precipProbability;
                currentlyWidget.humidity = response.data.currently.humidity;
                // console.log(axiosLon);
                   });
             })
             .catch(function(err){
               console.log(err);
             });

    },
    updateWeather: function(){
      this.getWeather(this.local);
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
  this.getWeather('Gainesville, 32605');

  },


});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    icon: 'clear-night',
    summary: 'blahblah ',
    latitude: '',
    longitude:'',
    days: [],
    local: '',
    show: false,
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

    getDailyWeather: function(local){
      var url = `/location/${local}`;
        axios.get(url)
             .then(function(response){
               var axiosLon = response.data.results[0].geometry.location.lng;
               var axiosLat = response.data.results[0].geometry.location.lat;
              return axios.get(`/weather/${axiosLat},${axiosLon}`)
              .then(function(response){
                dailyWidget.time = response.data.daily.time;
                dailyWidget.summary = response.data.daily.summary;
                dailyWidget.icon = response.data.daily.icon;
                dailyWidget.days = response.data.daily.data;

                   });
             })
           .catch(function(err){
             console.log(err);
           });
    },
    updateWeather: function(){
      this.getDailyWeather(dailyWidget.local);
    },
  },

  created: function(){
    this.getDailyWeather('Gainesville, Fl');
  }
});

var hourlyWidget = new Vue({
  el: '#hourly',
  data : {
    summary: 'it gon rain',
    icon: 'clear-night',
    latitude: '',
    longitude:'',
    hours: [],
    local: '',
    show:false,
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
    getHourlyWeather: function(local){
      var url = `/location/${local}`;
        axios.get(url)
             .then(function(response){
               var axiosLon = response.data.results[0].geometry.location.lng;
               var axiosLat = response.data.results[0].geometry.location.lat;
              return axios.get(`/weather/${axiosLat},${axiosLon}`)
              .then(function(response){
                hourlyWidget.time = response.data.hourly.time;
                hourlyWidget.summary = response.data.hourly.summary;
                hourlyWidget.icon = response.data.hourly.icon;
                hourlyWidget.hours = response.data.hourly.data;
                   });
             })
           .catch(function(err){
             console.log(err);
           });
    },
    updateWeather: function(){
      this.getHourlyWeather(hourlyWidget.local);
    },
  },
  created: function (){
    this.getHourlyWeather('Gainesville, Fl');
  }
});

var minutelyWidget = new Vue({
  el: '#minutely',
  data: {
    icon: 'icon',
    precipProbability: 0,
    minutes: [],
    local: '',
    show: false,
  },
  methods: {
    urlIcon: function(icon){
      return `/images/${icon}.png`;
    },
    getMinutelyWeather: function(local){
      var url = `/location/${local}`;
        axios.get(url)
             .then(function(response){
               var axiosLon = response.data.results[0].geometry.location.lng;
               var axiosLat = response.data.results[0].geometry.location.lat;
              return axios.get(`/weather/${axiosLat},${axiosLon}`)
              .then(function(response){
                minutelyWidget.time = response.data.minutely.time;
                minutelyWidget.summary = response.data.minutely.summary;
                minutelyWidget.icon = response.data.minutely.icon;
                minutelyWidget.minutes = response.data.minutely.data;
                   });
             })
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
      this.getMinutelyWeather(this.local);
    },
  },

  created: function(){
    this.getMinutelyWeather('Gainesville, Fl');
  }

});
