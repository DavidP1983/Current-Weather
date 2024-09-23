import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import Fade from '@mui/material/Fade';
import { Popover } from 'antd';

import './menu.scss';

interface ShowInput {
    showInput: (val: Boolean) => void
}

const content = (
    <div>
        <p>More info</p>
    </div>
);

export default function FadeMenu({ showInput }: ShowInput) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = () => {
        showInput(true);
        setAnchorEl(null);
    }

    return (
        <div className='menu'>
            <Button
                id="fade-button"
                style={{ color: "#ffff" }}
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Popover content={content}>
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
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleSearch}>search <SearchIcon className='search-icon' /></MenuItem>
            </Menu>
        </div>
    );
}