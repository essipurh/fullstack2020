import React from 'react';

const WeatherIcon = ({icon, descr}) => <img src={icon} alt={descr} width="100" height="50"></img>

const Weather = ({country, api_key}) => {

    console.log(country)
  // TODO: sää ei toimi! varmaan oitää kutsua appissa tätä
    const axios = require('axios');
    const params = {
      access_key: api_key,
      query: country
    }
  

  axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data;
      console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
    }).catch(error => {
      console.log(error);
    });
    
    return(
      <div>
        <h3> Weather in {country}</h3>
        <div><b>Temperature:  </b>℃</div>
        
        <div><b>Wind:  </b></div>
      </div>
    )
  }

  export default Weather