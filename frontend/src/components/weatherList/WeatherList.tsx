import { Data } from 'shared/types/types';
import { AlertDialogSlide } from 'shared/ui';
import { WeatherItem } from '../weatherItem/WeatherItem';

import './weather.scss';

interface WeatherListProps {
  data: Data;
}

export const WeatherList = ({ data }: WeatherListProps) => {
  return (
    <>
      <WeatherItem weatherProps={data} />
      <AlertDialogSlide />
    </>
  );
};
