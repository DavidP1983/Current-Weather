import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { Popover } from 'antd';
import { useMenu } from 'model/useMenu';
import { FadeMenuProps } from './type.fadeMenu';

import './fade-menu.scss';

export const FadeMenu = ({
  fadeMenu,
  items,
  popoverContent,
  className,
}: FadeMenuProps) => {
  const { anchorEl, open, handleClick, handleClose } = useMenu();

  return (
    <div className={!fadeMenu ? `menu ${className ?? ''}` : `fade`}>
      <Button
        id="fade-button"
        style={{ color: '#ffff' }}
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Popover content={popoverContent}>
          <MoreHorizIcon />
        </Popover>
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        {items.map((item) => (
          <MenuItem
            className="icon"
            key={item.label}
            onClick={() => {
              item.onClick();
              handleClose();
            }}>
            {item.label}
            {item.icon}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
