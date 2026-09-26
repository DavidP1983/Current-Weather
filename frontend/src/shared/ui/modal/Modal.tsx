import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

export function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action: string) => {
    if (action === 'telegram') {
      window.open('https://t.me/weather_assistant_2026_bot', '_blank');
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        className="modal"
        variant="outlined"
        onClick={handleClickOpen}>
        Telegram Weather Alerts
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{'Telegram Set up'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Get weather updates directly in Telegram. Choose how often you want
            to receive them.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('disagree')}>Disagree</Button>
          <Button onClick={() => handleClose('telegram')}>
            {' '}
            Set up Telegram alerts
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
