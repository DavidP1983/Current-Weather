import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('Checking Error component', () => {
  it('Error render', () => {
    render(<ErrorMessage errorMessage="some error" />);

    expect(screen.getByText('some error')).toBeInTheDocument();
  });

  it('Without props', () => {
    render(<ErrorMessage errorMessage="" />);

    expect(screen.getByText('try reload the page')).toBeInTheDocument();
  });
});
