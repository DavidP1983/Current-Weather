import { useState } from 'react';

export const useCitySearch = (getCity: (val: string) => void) => {
  const [value, setValue] = useState<string>('');
  const [isValidInputValue, setIsValidInputValue] = useState(true);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimValue = e.target.value.trim();
    const regex = /^[\p{L}]+(?:[\s-][\p{L}]+)*$/u;

    const isValidValue = !trimValue || regex.test(trimValue);

    setIsValidInputValue(isValidValue);
    setValue(trimValue);
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!value.length || !isValidInputValue) {
      return;
    }
    const capitalize = value.charAt(0)?.toUpperCase() + value.slice(1);
    getCity(capitalize);
    setValue('');
  };

  return { changeHandler, clickHandler, value, isValidInputValue };
};
