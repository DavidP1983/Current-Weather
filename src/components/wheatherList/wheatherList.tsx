import { Data } from "../../types/types"; // type
import WeatherItem from "../wheatherItem/WeatherItem";

import './wheather.scss';

interface WeatherListProps {
    data: Data;
}
// { users }: UserListProps
const WeatherList = ({ data }: WeatherListProps) => {

    return (
        <WeatherItem weatherProps={data} />
    );
}

export default WeatherList;

