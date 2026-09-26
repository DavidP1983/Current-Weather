import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LinearProgressBar } from './LinearProgressBar';

describe('Test LinearProgressBar component', () => {
  it('should render LinearProgressBar', () => {
    render(<LinearProgressBar />);
  });
});
