import '@testing-library/jest-dom';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useNetworkStatus } from './useNetworkStatus';

describe('Test useNetworkStatus', () => {
  it('should return initial result', () => {
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(true);
    expect(result.current.text).toBe('');
    expect(result.current.clazz).toBe('');
  });

  it('should update status when offline', async () => {
    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    await waitFor(() => {
      expect(result.current.isOnline).toBe(false);
      expect(result.current.text).toBe('You are offline');
      expect(result.current.clazz).toBe('show');
    });
  });

  it('should update status when online', async () => {
    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      expect(result.current.isOnline).toBe(true);
      expect(result.current.text).toBe('You are online');
      expect(result.current.clazz).toBe('show');
    });
  });

  it('should hide popup after 3000ms', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.clazz).toBe('');
    jest.useRealTimers();
  });

  it('should clear timer if online', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.clazz).toBe('show');

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.clazz).toBe('');
    jest.useRealTimers();
  });
});
