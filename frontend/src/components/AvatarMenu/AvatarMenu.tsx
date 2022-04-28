import * as React from 'react';
import ProfileMe from '../../assets/images/profile.png';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { logout } from "../../actions/authActions/authAction";
import { useDispatch } from "react-redux";

const AvatarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  const handleLogout = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.stopPropagation();
    handleClose();

    dispatch(logout());
  }

  return (
    <>
      <div className={'AvatarMenu__Avatar'}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={ProfileMe} sx={{ width: 32, height: 32 }}/>
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        className={'AvatarMenu__Menu'}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Avatar src={ProfileMe} sx={{ width: 32, height: 32 }}/> 
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AvatarMenu;