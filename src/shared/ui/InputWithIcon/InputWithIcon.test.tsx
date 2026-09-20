import SearchIcon from '@mui/icons-material/Search';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { InputWithIcon } from './InputWithIcon';

const onChangeHandler = jest.fn();
const clickHandler = jest.fn();

describe('Test InputWithIcon component', () => {
  it('should render InputWithIcon', () => {
    render(
      <InputWithIcon
        city=""
        status="idle"
        className="btn"
        value=""
        isValid={false}
        onChange={onChangeHandler}
        onIconClick={clickHandler}
        autoFocus={true}
        icon={<SearchIcon />}
        placeholder="Search Your City"
      />
    );
  });

  it('should search without value', () => {
    render(
      <InputWithIcon
        city=""
        status="idle"
        className="btn"
        value=""
        isValid={false}
        onChange={onChangeHandler}
        onIconClick={clickHandler}
        autoFocus={true}
        icon={<SearchIcon />}
        placeholder="Search Your City"
      />
    );

    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn');
    expect(btn).toBeDefined();
  });

  it('should call onIconClick when button is clicked', async () => {
    render(
      <InputWithIcon
        city="Montreal"
        status="idle"
        className="btn"
        value="Montreal"
        isValid={true}
        onChange={onChangeHandler}
        onIconClick={clickHandler}
        autoFocus={true}
        icon={<SearchIcon />}
        placeholder="Search Your City"
      />
    );

    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
