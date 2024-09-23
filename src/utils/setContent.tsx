import { match } from 'ts-pattern';
import { TStatus } from '../hooks/http.hook';
import { Data } from '../types/types';
import Spinner from '../components/UI/spinner/Spinner';
import Error from '../components/UI/Error/Error';
import WeatherList from '../components/wheatherList/wheatherList';

export const setContent = (process: TStatus, data: Data | undefined) =>
    match(process)
        .with('loading', () => <Spinner />)
        .with('idle', () => data === undefined ? null : <WeatherList data={data} />)
        .with('error', () => <Error />)
        .otherwise(() => '');
