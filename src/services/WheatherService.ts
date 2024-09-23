import { useHttp } from "../hooks/http.hook"
import { Data } from "../types/types";

const key = process.env.REACT_APP_API_KEY

const WheatherService = () => {
    const { process, request } = useHttp();

    const _APIKey = key;
    const _apiQueryParams = "&units=metric&lang=en&exclude=hourly,daily&APPID="
    const _apiBase = "https://api.openweathermap.org/data/2.5/weather?q=";


    const getData = async (city = "Montreal"): Promise<Data> => {
        const result = await request({ url: `${_apiBase}${city}${_apiQueryParams}${_APIKey}` });
        return result;
    }

    return { process, getData };
}

export default WheatherService;