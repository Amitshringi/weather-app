import React, { useState, useEffect } from 'react';
import { useDate } from '../Utils/useDate';

import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

import '../index.css'

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  minTemp,
  maxTemp,
  feelLike
}) => {
  const [icon, setIcon] = useState(sun);
  const { date, time , year} = useDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) setIcon(cloud);
      else if (iconString.toLowerCase().includes('rain')) setIcon(rain);
      else if (iconString.toLowerCase().includes('clear')) setIcon(sun);
      else if (iconString.toLowerCase().includes('thunder')) setIcon(storm);
      else if (iconString.toLowerCase().includes('fog')) setIcon(fog);
      else if (iconString.toLowerCase().includes('snow')) setIcon(snow);
      else if (iconString.toLowerCase().includes('wind')) setIcon(wind);
    }
  }, [iconString]);


    return (
  <div className='w-[22rem] min-w-[34rem] h-[30rem] glassCard p-4'>
    <div className='header-section'>
      <img src={icon} alt="weather_icon" className='weather-icon' />
      <p className='temperature-display'>{temperature} &deg;C</p>
    </div>
    <div className='place-date-section'>
      <p>{place}</p>
      <p>{conditions}</p>
      <p>{date} {year}- {time}</p>
    </div>
    <div className='details-section'>
      <div className='info-box'>Wind Speed: {windspeed} km/h</div>
      <div className='info-box'>Humidity: {humidity} gm/m&sup3;</div>
      <div className='info-box'>Min Temp: {minTemp} &deg;C</div>
      <div className='info-box'>Max Temp: {maxTemp} &deg;C</div>
      <div className='info-box'>Feels Like: {feelLike} &deg;C</div>
    </div>
   
  </div>
);

};

export default WeatherCard;
