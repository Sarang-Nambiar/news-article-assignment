import React from 'react'
import "../Stylesheets/Navbar.css"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar() {
  return (
    <>
        <div className='navbar'>
            <div className='logo'>
            </div>
            <div className='menu'>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    </>
  )
}
