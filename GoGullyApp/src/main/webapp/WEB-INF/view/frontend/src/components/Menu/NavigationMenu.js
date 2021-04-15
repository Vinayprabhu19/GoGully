import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
export default function NavigationMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{float:props.floatType}}>
      <Button aria-controls="social-menu" aria-haspopup="true" onClick={handleClick}>
         <MenuIcon/>
      </Button>
      {
      Boolean(anchorEl) && <Menu
        id="social-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
            <a href="/Teams" >
                  Teams
              </a>
            </MenuItem>
        <MenuItem onClick={handleClose}>
            <a href="/Tournaments" >
                  Tournaments
              </a>
            </MenuItem>
        <MenuItem onClick={handleClose}>
            <a href="/Matches" >
                  Matches
              </a>
            </MenuItem>
        <MenuItem onClick={handleClose}>
            <a href="/Profile" >
                  profile
              </a>
            </MenuItem>
        <MenuItem onClick={handleClose}>
            <a href="/Logout" >
                  Logout
              </a>
            </MenuItem>
      </Menu>
      }
    </div>
  );
}