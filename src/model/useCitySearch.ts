import { useState } from 'react';

export const useCitySearch = (getCity: (val: string) => void) => {
  const [value, setValue] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!value.length) {
      return;
    }
    const capitalize = value.charAt(0)?.toUpperCase() + value.slice(1);
    getCity(capitalize);
    setValue('');
  };

  return { changeHandler, clickHandler, value };
};
