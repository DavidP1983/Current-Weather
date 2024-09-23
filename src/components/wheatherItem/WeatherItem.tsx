import { Data } from "../../types/types";
import * as weatherIcon from '../../assets/index';
import { useFormatDate } from "../../hooks/useFormatDate";
import { useRoundDate } from "../../hooks/useRoundDate";
import { getUrl } from "../../utils/getUrl";

import './wheatherItem.scss';

interface WeatherItemProps {
    weatherProps: Data;
}


const WeatherItem = ({ weatherProps }: WeatherItemProps) => {
    const { name, main, weather, wind, timezone, coord } = weatherProps || {};
    const { mainTemp, tempMax, tempMin, feelsLike } = useRoundDate(main.temp, main.temp_max, main.temp_min, main.feels_like);
    const { sunriseToLocalTime, sunsetToLocalTime, currentDate } = useFormatDate(coord.lat, coord.lon, timezone);

    return (
        <div className="wheatherItem">
            <div className="wheatherItem__item">
                <ul className="wheatherItem__location">
                    <li>
                        <img src={weatherIcon.location} alt="location" className="location" />
                        <div className="city">{name}</div>
                    </li>
                    <li>
                        <div className="date">{currentDate}</div>
                    </li>
                    <li>
                        <div className="thermometer">
                            <img src={weatherIcon.thermometer} alt="thermometer" className="thermometer__icon" />
                            <div className="thermometer__deegre">{mainTemp} <span>&#x2103;</span></div>
                        </div>
                        <div className="thermometer__feels">{tempMax}<span>&#xb0;</span> / {tempMin}<span>&#xb0;</span> | Feels like {feelsLike} <span>&#x2103;</span></div>
                    </li>
                </ul>
            </div>
            <div className="wheatherItem__item">
                <div className="wheatherItem__picture">
                    <div>
                        <img src={getUrl(weather[0].icon)} alt={weather[0].icon} />
                    </div>
                    <div className="wheatherItem__picture-name">
                        {weather[0].description}
                    </div>
                </div>
            </div>
            <div className="wheatherItem__item">
                <ul className="wheatherItem__details">
                    <li>
                        <img src={weatherIcon.sunrise} alt="sunrise" />
                        <div> sunrise {sunriseToLocalTime}</div>
                    </li>
                    <li>
                        <img src={weatherIcon.sunset} alt="sunset" />
                        <div>sunset {sunsetToLocalTime}</div>
                    </li>
                    <li>
                        <img src={weatherIcon.drop} alt="drop" />
                        <div>humidity {main.humidity}%</div>
                    </li>
                    <li>
                        <img src={weatherIcon.wind} alt="dwindrop" />
                        <div>{wind.speed} km/h</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default WeatherItem;