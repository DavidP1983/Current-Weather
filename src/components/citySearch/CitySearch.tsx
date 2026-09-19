import SearchIcon from '@mui/icons-material/Search';
import { useCitySearch } from 'model/useCitySearch';
import { Status } from 'shared/types/types';
import { InputWithIcon } from 'shared/ui/InputWithIcon/InputWithIcon';

import './search.scss';

interface CitySearchProps {
  variant: boolean;
  status: Status;
  getCity: (val: string) => void;
}

export const CitySearch = ({ variant, getCity, status }: CitySearchProps) => {
  const { changeHandler, clickHandler, value } = useCitySearch(getCity);

  return (
    <>
      {variant && (
        <div className="search">
          <InputWithIcon
            city={value}
            status={status}
            className="btn"
            value={value}
            onChange={changeHandler}
            onIconClick={clickHandler}
            autoFocus={variant}
            icon={<SearchIcon />}
            placeholder="Search Your City"
          />
        </div>
      )}
    </>
  );
};
