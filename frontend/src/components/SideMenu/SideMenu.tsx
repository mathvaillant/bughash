import React, { ReactElement, useCallback } from 'react';
import { Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import classNames from "classnames";
import HomeIcon from '@mui/icons-material/Home';
import Open from '@mui/icons-material/KeyboardArrowRight';
import Close from '@mui/icons-material/KeyboardArrowLeft';
import ListIcon from '@mui/icons-material/List';
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import { useSelector } from "react-redux";
import { getAppTheme } from "../../utils/selectors/theme";

const SideMenu: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const theme = useSelector(getAppTheme);

  const pathIcons: Record<string, ReactElement> = {
    'Dashboard': <HomeIcon fontSize="small" />,
    'List': <ListIcon fontSize="small" />,
  }

  const handleExpandSidebar = (): void => setExpanded(!expanded);

  const navigateToPath = (e: React.MouseEvent<HTMLElement>, path: string): void => navigate(path);
  
  const getPathRedirectButton = (pathname: string): JSX.Element => {
    if(!expanded) {
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
      className={classNames('SideMenu', {open: expanded, closed: !expanded, darkTheme: theme === 'dark'})} 
      data-sidebar-section='toggleClose'
    > 
      <a className="logoName" onClick={() => navigate('/dashboard')}>{!expanded ? 'BH' : 'BugHash'}</a>
      
      <IconButton className={`Sidebar__expandButton ${theme}`} onClick={handleExpandSidebar}>
      {
        !expanded ? <Open /> : <Close />
      }
      </IconButton>

      {getPathRedirectButton('Dashboard')}
      {getPathRedirectButton('List')}
      
      <AvatarMenu />
    </div>
  )
}

export default SideMenu