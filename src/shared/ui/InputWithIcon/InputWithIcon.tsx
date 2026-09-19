import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Status } from 'shared/types/types';
import { Input } from '../Input/Input';
import { InputProps } from '../Input/type.input';

type InputWithIconProps = InputProps & {
  icon: React.ReactNode;
  onIconClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
  city: string;
  status: Status;
};

export const InputWithIcon = ({
  icon,
  onIconClick,
  className,
  city,
  status,
  ...inputProps
}: InputWithIconProps) => {
  return (
    <Paper
      className="form"
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      }}>
      <Input {...inputProps} />

      <IconButton
        disabled={city.length === 0 || status === 'loading'}
        className={className}
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={onIconClick}>
        {icon}
      </IconButton>
    </Paper>
  );
};
