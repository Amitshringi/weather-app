// src/components/MiniCard.js

import React, { useEffect, useState } from 'react';
import sunIcon from '../assets/icons/sun.png';
import cloudIcon from '../assets/icons/cloud.png';
import fogIcon from '../assets/icons/fog.png';
import rainIcon from '../assets/icons/rain.png';
import snowIcon from '../assets/icons/snow.png';
import stormIcon from '../assets/icons/storm.png';
import windIcon from '../assets/icons/windy.png';

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState(sunIcon);

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) setIcon(cloudIcon);
      else if (iconString.toLowerCase().includes('rain')) setIcon(rainIcon);
      else if (iconString.toLowerCase().includes('clear')) setIcon(sunIcon);
      else if (iconString.toLowerCase().includes('thunder')) setIcon(stormIcon);
      else if (iconString.toLowerCase().includes('fog')) setIcon(fogIcon);
      else if (iconString.toLowerCase().includes('snow')) setIcon(snowIcon);
      else if (iconString.toLowerCase().includes('wind')) setIcon(windIcon);
    }
  }, [iconString]);

  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col items-center">
      <p className="text-center text-lg font-semibold">
        {new Date(time).toLocaleDateString('en', { weekday: 'short' })}
      </p>
      <hr className="my-2 w-full" />
      <img src={icon} alt="Weather condition icon" className="w-[3rem] h-[3rem] mb-2" />
      <p className="text-center font-bold text-xl">{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
