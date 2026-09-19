/* eslint-disable react-you-might-not-need-an-effect/no-event-handler */
import InputBase from '@mui/material/InputBase';
import { useEffect, useRef } from 'react';
import { InputProps } from './type.input';

export const Input = ({
  value,
  placeholder,
  autoFocus,
  onChange,
}: InputProps) => {
  const myRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      myRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <InputBase
      value={value}
      onChange={onChange}
      inputRef={myRef}
      sx={{ ml: 1, flex: 1 }}
      placeholder={placeholder}
      inputProps={{ 'aria-label': `${placeholder}` }}
    />
  );
};
