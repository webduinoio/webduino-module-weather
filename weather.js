+(function(window, document) {

  'use strict';

  function weather_aqi(callback) {
    var replyMsg = '';
    $.post('https://script.google.com/macros/s/AKfycbxfzHxi1ok-NxVGBN5vAU-VuyGpYV0VQt8TSGeMe8w0Ompvw6o/exec', {
        type: 'weather'
      },
      function(data) {
        callback([data, 'aqi']);
      });
  }

  function weather_aqi_data(name, type, e) {
    let arr = e[0];
    if (e[1] == 'aqi') {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].SiteName == name) {
          if (type == 'all') {
            let replyMsg = arr[i].SiteName + '的' + arr[i].note + ' ( PM2.5：' + arr[i].PM25 + '，PM10：' + arr[i].PM10 + '，臭氧：' + arr[i].O3 + '，一氧化碳：' + arr[i].CO + '，二氧化氮：' + arr[i].NO2 + '，二氧化硫：' + arr[i].SO2 + ' )';
            return replyMsg;
          } else {
            return arr[i][type];
          }
        }
      }
    } else {
      return '資料格式錯誤';
    }
  }

  function weather_observe(callback) {
    $.post('https://script.google.com/macros/s/AKfycbyvTOcbo0mM1ecyWxTUsv4sBzfdEupD04q0LeZ7IGGgGMiHgRHx/exec', {
        type: 'weather'
      },
      function(data) {
        callback([data, 'observe']);
      });
  }


  function weather_observe_data(name, type, e) {
    let arr = e[0];
    let num = type * 1;
    if (e[1] == 'observe') {
      let result = arr[name];
      if (num == 0) {
        return name + '現在的溫度 ' + result[0] + ' 度，當日累積雨量 ' + result[4] + ' mm，相對濕度 ' + result[1] + '%，風力 ' + result[2] + ' 級，天氣概況：' + result[3];
      } else {
        return result[num - 1];
      }
    } else {
      return '資料格式錯誤';
    }
  }

  function weather_forecast(callback) {
    $.post('https://script.google.com/macros/s/AKfycbygv1-_U7y5ieMYKASXI0l4hLsMKekasUpzl4gKiL0BwNyE1vU/exec', {
        type: 'weather'
      },
      function(data) {
        callback([data, 'forecast']);
      });
  }


  function weather_forecast_data(name, type, e) {
    if (e[1] == 'forecast') {
      let num = type * 1;
      let result = e[0][name][num];
      let note;
      if (num == 0) {
        note = '未來 6 小時預報：';
      } else if (num == 1) {
        note = '未來 18 小時預報：';
      } else {
        note = '未來 36 小時預報：';
      }
      return name + note + '氣溫 ' + result[0] + 'C，降雨機率 ' + result[1] + '，' + result[2];
    } else {
      return '資料格式錯誤';
    }
  }

  function weather_reservoir(callback) {
    $.post('https://script.google.com/macros/s/AKfycbwKdkbIJdBp47LQdUwdGj3Bx6G--VLhPbTb-hrNbxQFee-WEikL/exec', {
        type: 'weather'
      },
      function(data) {
        callback([data, 'reservoir']);
      });
  }


  function weather_reservoir_data(name, type, e) {
    if (e[1] == 'reservoir') {
      let result = e[0][name];
      if (type == 'all') {
        return name + '蓄水百分比：' + result.CapacityRate + '%，有效蓄水量：' + result.Capacity + ' 萬立方公尺，本日降雨：' + result.Basin_Rain;
      } else {
        return result[type];
      }
    } else {
      return '資料格式錯誤';
    }
  }

  function weather_quake(callback) {
    $.post('https://script.google.com/macros/s/AKfycbxDyp2rmO7iVURZWT3Qg8UsDOuzgxrFjKm1FGxsrm2FAJWG8BE/exec', {
        type: 'weather'
      },
      function(data) {
        callback([data, 'quake']);
      });
  }


  function weather_quake_data(num, e) {
    if (e[1] == 'quake') {
      let result = e[0];
      let content;
      if (num == '0') {
        content = result[0];
      } else if (num == '1') {
        content = result[0] + '、' + result[1];
      } else if (num == '2') {
        content = result[0] + '、' + result[1] + '、' + result[2];
      }
      return content;
    } else {
      return '資料格式錯誤';
    }
  }

  function weather_radar(callback) {
    $.post('https://script.google.com/macros/s/AKfycbyxRFGpRm0N0D_7u_abAqZrd259uHTi8habrSw0H6v20TEj21g/exec', {
        type: 'weather'
      },
      function(data) {
        callback([data, 'radar']);
      });
  }
  function weather_radar_data(e) {
    if (e[1] == 'radar') {
      let result = e[0];
      return result;
    } else {
      return '資料格式錯誤';
    }
  }
  window.weather_radar_data = weather_radar_data;
  window.weather_radar = weather_radar;
  window.weather_quake_data = weather_quake_data;
  window.weather_quake = weather_quake;
  window.weather_reservoir_data = weather_reservoir_data;
  window.weather_reservoir = weather_reservoir;
  window.weather_forecast_data = weather_forecast_data;
  window.weather_forecast = weather_forecast;
  window.weather_observe_data = weather_observe_data;
  window.weather_observe = weather_observe;
  window.weather_aqi_data = weather_aqi_data;
  window.weather_aqi = weather_aqi;

}(window, window.document));
