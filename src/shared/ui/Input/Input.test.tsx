import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

const onChange = jest.fn();

describe('Test Input component', () => {
  it('should render Input component', () => {
    render(
      <Input
        value=""
        onChange={onChange}
        autoFocus={true}
        placeholder="Search Your City"
      />
    );

    const placeholder = screen.getByPlaceholderText('Search Your City');
    expect(placeholder).toBeInTheDocument();
  });

  it('should call onChange when user types', async () => {
    render(
      <Input
        value=""
        onChange={onChange}
        autoFocus={true}
        placeholder="Search Your City"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    await userEvent.type(input, 'Montreal');
    expect(onChange).toHaveBeenCalledTimes(8);
  });

  it('should focus input when autoFocus is true', () => {
    render(
      <Input
        value=""
        onChange={onChange}
        autoFocus={true}
        placeholder="Search Your City"
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('should not focus input when autoFocus is false', () => {
    render(
      <Input
        value=""
        onChange={onChange}
        autoFocus={false}
        placeholder="Search Your City"
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveFocus();
  });
});
