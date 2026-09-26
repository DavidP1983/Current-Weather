import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Test Spinner component', () => {
  it('should render Spinner component', () => {
    render(<Spinner />);
  });
});
