import React, { ReactElement } from 'react';
import { Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import classNames from "classnames";
import HomeIcon from '@mui/icons-material/Home';
import Open from '@mui/icons-material/KeyboardArrowRight';
import Close from '@mui/icons-material/KeyboardArrowLeft';
import ListIcon from '@mui/icons-material/List';
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import { useDispatch, useSelector } from "react-redux";
import { getAppTheme } from "../../utils/selectors/theme";
import { toggleSidebar } from "../../actions/sidebarActions";
import { getSidebarExpandedState } from "../../utils/selectors/sidebar";

const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(getAppTheme);
  const sidebarExpanded = useSelector(getSidebarExpandedState);

  const pathIcons: Record<string, ReactElement> = {
    'Dashboard': <HomeIcon fontSize="small" />,
    'List': <ListIcon fontSize="small" />,
  }

  const handleToggleSidebar = (): void => {
    dispatch(toggleSidebar(!sidebarExpanded));
  };

  const navigateToPath = (e: React.MouseEvent<HTMLElement>, path: string): void => navigate(path);
  
  const getPathRedirectButton = (pathname: string): JSX.Element => {
    if(!sidebarExpanded) {
      return <Tooltip placement={'right'} title={pathname}>
        <IconButton
          className={theme} 
          onClick={(e) => navigateToPath(e, `/${pathname.toLowerCase()}`)}
        >
          {pathIcons[pathname]}
        </IconButton>
      </Tooltip>
    }
    return (
      <Button 
        className={theme}
        onClick={(e) => navigateToPath(e, `/${pathname.toLowerCase()}`)} 
        startIcon={pathIcons[pathname]}
      >
        {pathname}
      </Button>
    )
  };

  return (
    <div 
      className={classNames('SideMenu', {open: sidebarExpanded, closed: !sidebarExpanded, darkTheme: theme === 'dark'})} 
      data-sidebar-section='toggleClose'
    > 
      <a className="logoName" onClick={() => navigate('/dashboard')}>{!sidebarExpanded ? 'BH' : 'BugHash'}</a>
      
      <IconButton className={`Sidebar__expandButton ${theme}`} onClick={handleToggleSidebar}>
      {
        !sidebarExpanded ? <Open /> : <Close />
      }
      </IconButton>

      {getPathRedirectButton('Dashboard')}
      {getPathRedirectButton('List')}
      
      <AvatarMenu />
    </div>
  )
}

export default SideMenu