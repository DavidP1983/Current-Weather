import { Data } from "./types/types"; // interface
import { useEffect, useState } from "react";
import WheatherService from "./services/WheatherService";
import { setContent } from "./utils/setContent";
import FadeMenu from "./components/menu/Menu";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [showInput, setShowInput] = useState<Boolean>(false);
  const [city, setCity] = useState<string>('');

  const { process, getData } = WheatherService();

  useEffect(() => {
    if (city.length === 0) {
      getData().then(setData);
    } else {
      getData(city).then(setData);
    }
  }, [city]);

  const getCity = (value: string) => {
    setCity(value);
  }


  return (
    <div className="app">
      <div className="wheather">
        <MyInput variant={showInput} getCity={getCity} />
        <FadeMenu showInput={setShowInput} />
        {setContent(process, data)}
      </div>
    </div>
  );
}

export default App;
