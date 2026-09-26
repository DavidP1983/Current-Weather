import SearchIcon from '@mui/icons-material/Search';
import { CitySearch } from 'components/citySearch/CitySearch';
import { NetworkStatus } from 'components/networkStatus/NetworkStatus';
import { useNetworkStatus } from 'model/useNetworkStatus';
import { useWeather } from 'model/useWeather';
import { useMemo, useState } from 'react';
import { FadeMenu } from 'shared/ui';
import { getWeatherContent } from './getWeatherContent';

function App() {
  const { clazz, isOnline, text } = useNetworkStatus();
  const { data, errorMessage, status, getCity } = useWeather(isOnline);
  const [showInput, setShowInput] = useState<boolean>(false);

  const item = useMemo(() => {
    return [
      {
        label: 'search',
        icon: <SearchIcon className="icon" />,
        onClick: () => setShowInput(true),
      },
    ];
  }, []);

  return (
    <main className="app">
      <div className="header">
        <h1 className="title">Weather App</h1>
        <CitySearch
          variant={showInput}
          getCity={getCity}
          status={status}
        />
      </div>
      <div className="wrapper">
        <FadeMenu
          fadeMenu={showInput}
          popoverContent={
            <div>
              <p>More info</p>
            </div>
          }
          items={item}
        />
        {getWeatherContent(status, data, errorMessage)}
      </div>
      <NetworkStatus
        clazz={clazz}
        isOnline={isOnline}
        text={text}
      />
    </main>
  );
}

export default App;
