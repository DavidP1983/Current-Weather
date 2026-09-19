import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import './progress.scss';

export const LinearProgressBar = () => {
  return (
    <div className="progress">
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          color="success"
          aria-label="Loading…"
        />
      </Box>
    </div>
  );
};
