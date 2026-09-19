import { useEffect, useState } from 'react';
import { weatherServices } from 'services/WeatherServices';
import { CityDetectionError } from 'shared/errors/CityDetectionError';
import { errorsHandler } from 'shared/errors/errorsHandler';
import { getCityFromTimeZone } from 'shared/lib/getCityFromTimeZone';
import { Data, Status } from 'shared/types/types';

export const useWeather = (isOnline: boolean) => {
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getCity = (city: string, signal?: AbortSignal) => {
    setStatus('loading');
    weatherServices
      .getCity(city, signal)
      .then((res) => {
        setData(res);
        setErrorMessage('');
        setStatus('idle');
      })
      .catch((e) => {
        const errorMessage = errorsHandler(e);
        setErrorMessage(errorMessage);
        setStatus('error');
      });
  };

  useEffect(() => {
    if (!isOnline) {
      return;
    }

    const city = getCityFromTimeZone();
    const controller = new AbortController();

    if (!city) {
      const errorMessage = errorsHandler(
        new CityDetectionError('Unable to determine your city')
      );

      setErrorMessage(errorMessage);
      setStatus('error');

      return;
    }
    getCity(city, controller.signal);

    return () => controller.abort();
  }, [isOnline]);

  return {
    data,
    status,
    errorMessage,
    getCity,
  };
};
