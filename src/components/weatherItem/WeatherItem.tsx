import * as weatherIcon from 'assets/index';
import { useFormatDate } from 'model/useFormatDate';
import { roundTemperature } from 'shared/lib/roundTemperature';
import { Data } from 'shared/types/types';
import { ErrorMessage } from 'shared/ui/Error/ErrorMessage';
import { getWeatherIcon } from './getWeatherIcon';

import './weatherItem.scss';

interface WeatherItemProps {
  weatherProps: Data;
}

export const WeatherItem = ({ weatherProps }: WeatherItemProps) => {
  const { name, main, weather, wind, timezone, coord } = weatherProps;

  const { sunriseToLocalTime, sunsetToLocalTime, currentDate } = useFormatDate(
    coord.lat,
    coord.lon,
    timezone
  );

  if (!main || !weather?.length || !wind || !coord) {
    return <ErrorMessage errorMessage="Incomplete weather data" />;
  }
  const { mainTemp, tempMax, tempMin, feelsLike } = roundTemperature(
    main.temp,
    main.temp_max,
    main.temp_min,
    main.feels_like
  );

  const iconSrc = getWeatherIcon(weather[0].icon);

  return (
    <div className="description">
      <div className="description__item">
        <ul className="description__location">
          <li>
            <img
              src={weatherIcon.location}
              alt="location"
              className="location"
            />
            <div className="city">{name}</div>
          </li>
          <li>
            <div className="date">{currentDate}</div>
          </li>
          <li>
            <div className="thermometer">
              <img
                src={weatherIcon.thermometer}
                alt="thermometer"
                className="thermometer__icon"
              />
              <div className="thermometer__degree">
                {mainTemp} <span>&#x2103;</span>
              </div>
            </div>
            <div className="thermometer__feels">
              {tempMax}
              <span>&#xb0;</span> / {tempMin}
              <span>&#xb0;</span> | Feels like {feelsLike} <span>&#x2103;</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="description__item">
        <div className="description__picture">
          <img
            className="weather"
            src={iconSrc}
            alt={weather[0].icon}
          />
          <div className="description__picture-name">
            {weather[0].description}
          </div>
        </div>
      </div>
      <div className="description__item">
        <ul className="description__details">
          <li>
            <img
              src={weatherIcon.sunrise}
              alt="sunrise"
            />
            <div> sunrise {sunriseToLocalTime}</div>
          </li>
          <li>
            <img
              src={weatherIcon.sunset}
              alt="sunset"
            />
            <div>sunset {sunsetToLocalTime}</div>
          </li>
          <li>
            <img
              src={weatherIcon.drop}
              alt="drop"
            />
            <div>humidity {main.humidity}%</div>
          </li>
          <li>
            <img
              src={weatherIcon.wind}
              alt="dwindrop"
            />
            <div>{wind.speed} km/h</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
