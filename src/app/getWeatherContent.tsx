import { WeatherList } from 'components/weatherList/WeatherList';
import { Data, Status } from 'shared/types/types';
import { CityNotFound } from 'shared/ui/cityNotFound/CityNotFound';
import { ErrorMessage } from 'shared/ui/Error/ErrorMessage';
import { LinearProgressBar } from 'shared/ui/LinearProgressBar/LinearProgressBar';
import { Spinner } from 'shared/ui/Spinner/Spinner';
import { match } from 'ts-pattern';

export const getWeatherContent = (
  process: Status,
  data: Data | null,
  errorMessage: string
) =>
  match(process)
    .with('loading', () => {
      if (errorMessage) {
        return (
          <>
            <LinearProgressBar />
            <ErrorMessage errorMessage={errorMessage} />
          </>
        );
      }

      return data ? (
        <>
          <LinearProgressBar />
          <WeatherList data={data} />
        </>
      ) : (
        <Spinner />
      );
    })
    .with('idle', () => (data ? <WeatherList data={data} /> : <CityNotFound />))
    .with('error', () => <ErrorMessage errorMessage={errorMessage} />)
    .otherwise(() => '');
