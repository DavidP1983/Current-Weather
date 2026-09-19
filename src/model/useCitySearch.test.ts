import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useCitySearch } from './useCitySearch';

describe('Test useCitySearch', () => {
  // to avoid errors from another tests - useWeather
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call changeHandler', () => {
    const { result } = renderHook(() => useCitySearch(jest.fn()));

    //оборачивает действие, которое вызывает изменение состояния.
    act(() => {
      result.current.changeHandler({
        target: {
          value: 'Montreal',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('Montreal');
  });

  it('should not call getCity when value is empty', () => {
    const getCityMock = jest.fn();
    const { result } = renderHook(() => useCitySearch(getCityMock));

    act(() => {
      result.current.clickHandler({
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>);
    });

    expect(getCityMock).not.toHaveBeenCalled();
  });

  it('should call getCity whit value', () => {
    const getCityMock = jest.fn();
    const { result } = renderHook(() => useCitySearch(getCityMock));

    act(() => {
      result.current.changeHandler({
        target: {
          value: 'Montreal',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.clickHandler({
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>);
    });

    expect(getCityMock).toHaveBeenCalledTimes(1);
    expect(getCityMock).toHaveBeenCalledWith('Montreal');
  });
});
