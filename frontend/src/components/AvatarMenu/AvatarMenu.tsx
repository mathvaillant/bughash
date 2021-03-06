import * as React from 'react';
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import { getAuthUserDataAvatar } from "../../utils/selectors/auth";

const AvatarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { isMobile } = useDeviceDetect();
  const userAvatar = useSelector(getAuthUserDataAvatar);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleGoTo = (e: React.MouseEvent<HTMLElement>, path: string): void => {
    navigator(path);
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
    if(!isMobile) {
      setAnchorEl(event.currentTarget);
      return;
    }

    handleGoTo(event, '/settings');
  };

  const handleClose = (): void => setAnchorEl(null);

  const handleLogout = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.stopPropagation();
    handleClose();

    dispatch(logout());
  }

  return (
    <>
      <div 
        className={'AvatarMenu__Avatar'}
        onMouseOver={handleOpen}
      >
        <Tooltip title="Options">
          <IconButton
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={userAvatar?.url} sx={{ width: 32, height: 32 }}/>
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        className={'AvatarMenu__Menu'}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem  onClick={(e) => handleGoTo(e, '/settings')}>
          <ListItemIcon>
            <Avatar src={userAvatar?.url} sx={{ width: 32, height: 32, marginRight: '10px'}}/> 
          </ListItemIcon>
          Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={(e) => handleGoTo(e, '/settings')}>
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