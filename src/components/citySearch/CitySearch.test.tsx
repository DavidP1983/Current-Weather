import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should contain class message if error in input', async () => {
    render(
      <CitySearch
        variant={true}
        getCity={getCityMock}
        status="idle"
      />
    );
    const input = screen.getByLabelText('Search Your City');
    await userEvent.type(input, 'mon2');

    const elem = screen.getByRole('alert');
    expect(elem).toHaveClass('message');
  });
});
