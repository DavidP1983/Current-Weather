import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


import './myInput.scss';


interface InputProps {
    variant: Boolean;
    getCity: (val: string) => void;
}

const MyInput = ({ variant, getCity }: InputProps) => {
    const [value, setValue] = useState<string>('');

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (value.length === 0) return;
        const capitalize = value.replace(/^./, value.charAt(0).toUpperCase());
        getCity(capitalize);
        setValue('');
    }



    return (
        <div className='myInput' style={{ display: variant ? 'block' : "none" }}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >

                <InputBase
                    value={value}
                    onChange={changeHandler}
                    autoFocus={true}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Your City"
                    inputProps={{ 'aria-label': 'search your city', style: { textTransform: 'capitalize' } }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={clickHandler}>
                    <SearchIcon />
                </IconButton>


            </Paper>
        </div>
    );
}

export default MyInput;