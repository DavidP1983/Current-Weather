import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CityNotFound } from './CityNotFound';

describe('Test CityNotFound component', () => {
  it('should render CityNotFound', () => {
    render(<CityNotFound />);
  });
});
