import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CitySearch } from './CitySearch';

const getCityMock = jest.fn();

describe('Test CitySearch', () => {
  it('should render CitySearch', () => {
    render(
      <CitySearch
        variant={true}
        getCity={getCityMock}
        status="idle"
      />
    );
  });

  it('should render if variant not true', () => {
    render(
      <CitySearch
        variant={false}
        getCity={getCityMock}
        status="idle"
      />
    );

    const inputWithIcon = document.querySelector('.btn');
    expect(inputWithIcon).not.toBeInTheDocument();
  });
});
