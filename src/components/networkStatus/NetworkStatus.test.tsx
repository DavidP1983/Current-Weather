import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NetworkStatus } from './NetworkStatus';

describe('Test NetworkStatus', () => {
  it('should render NetworkStatus', () => {
    render(
      <NetworkStatus
        clazz="show"
        isOnline={true}
        text="online"
      />
    );
  });

  it.each([
    [true, 'online'],
    [false, 'offline'],
  ])('should have correct classNames', (isOnline, statusClass) => {
    render(
      <NetworkStatus
        clazz="show"
        isOnline={isOnline}
        text="online"
      />
    );
    const elem = screen.getByText('online');
    expect(elem).toHaveClass('popup', 'show', statusClass);
  });
});
