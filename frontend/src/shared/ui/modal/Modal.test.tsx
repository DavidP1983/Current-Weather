import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AlertDialogSlide } from './Modal';

describe('Test Modal', () => {
  it('should open modal', async () => {
    render(<AlertDialogSlide />);

    const btn = screen.getByRole('button', { name: 'Telegram Weather Alerts' });
    await userEvent.click(btn);

    const popup = screen.getByText('Telegram Set up');
    expect(popup).toBeInTheDocument();
  });

  it('should close modal', async () => {
    render(<AlertDialogSlide />);

    const mainBtn = screen.getByRole('button', {
      name: 'Telegram Weather Alerts',
    });
    await userEvent.click(mainBtn);

    const closeBtn = screen.getByRole('button', { name: 'Disagree' });
    await userEvent.click(closeBtn);

    // Из-за анимации дожидаемся
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { level: 2 })
      ).not.toBeInTheDocument();
    });
  });

  it('should open Telegram when chooses alerts', async () => {
    const openMock = jest.spyOn(window, 'open').mockImplementation(() => null);

    render(<AlertDialogSlide />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Telegram Weather Alerts' })
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Set up Telegram alerts' })
    );

    expect(openMock).toHaveBeenCalledWith(
      'https://t.me/weather_assistant_2026_bot',
      '_blank'
    );
  });
});
