import SearchIcon from '@mui/icons-material/Search';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FadeMenu } from './FadeMenu';

const setShowInput = jest.fn();
const items = [
  {
    label: 'search',
    icon: <SearchIcon className="icon" />,
    onClick: () => setShowInput(true),
  },
];

describe('Checking FadeMenu component', () => {
  it('FadeMenu render', async () => {
    render(
      <FadeMenu
        fadeMenu={false}
        popoverContent={<p>More info</p>}
        items={items}
      />
    );

    const btn = document?.getElementById('fade-button');
    expect(btn).toBeInTheDocument();

    const icon = btn?.querySelector('svg');
    expect(icon).toBeInTheDocument();

    await userEvent.hover(icon!);
    expect(await screen.findByText('More info')).toBeInTheDocument();
  });

  it('should open menu after clicking the button', async () => {
    render(
      <FadeMenu
        fadeMenu={false}
        popoverContent={<p>More info</p>}
        items={items}
      />
    );

    expect(screen.queryByText('search')).not.toBeInTheDocument();
    const btn = document.getElementById('fade-button');
    await userEvent.click(btn!);

    expect(screen.getByText('search')).toBeInTheDocument();
  });

  it('should call item onClick and close menu', async () => {
    render(
      <FadeMenu
        fadeMenu={false}
        popoverContent={<p>More info</p>}
        items={items}
      />
    );

    const btn = document.getElementById('fade-button');
    await userEvent.click(btn!);

    const menuItem = screen.getByText('search');
    expect(menuItem).toBeInTheDocument();

    await userEvent.click(menuItem);
    expect(setShowInput).toHaveBeenCalledTimes(1);
  });

  it('should use fade class when fadeMenu is true', () => {
    const { container } = render(
      <FadeMenu
        fadeMenu={false}
        popoverContent={<p>More info</p>}
        items={items}
      />
    );

    expect(container.firstChild).toHaveClass('menu');
  });
});
