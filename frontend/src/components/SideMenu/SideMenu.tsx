import React, { useCallback } from 'react';
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";
import useToggle from "../../utils/hooks/useToggle";
import './SideMenu.scss';
import { useNavigate } from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import Open from '@mui/icons-material/KeyboardArrowRight';
import Close from '@mui/icons-material/KeyboardArrowLeft';
import useEventListener from "../../utils/hooks/useEventListener.js";
import ListIcon from '@mui/icons-material/List';
import ProfileMe from '../../assets/images/profile.png';

const SideMenu: React.FC = () => {
  const [expanded, setExpanded] = useToggle();
  const navigate = useNavigate();

  const handleClickAway = useCallback((e) => {
    const shouldResize = !e.target.closest("[data-sidebar-section]");

    if(shouldResize && expanded) {
      setExpanded();
    }
  }, [setExpanded, expanded]);

  useEventListener('click', handleClickAway);

  const navigateToPath = (e: React.MouseEvent<HTMLElement>, path: string): void => navigate(path);
  
  const getHomeButton = (): JSX.Element => {
    if(!expanded) {
      return <Tooltip placement={'right'} title={'Dashboard'}>
        <IconButton onClick={(e) => navigateToPath(e, '/dashboard')}><HomeIcon /></IconButton>
      </Tooltip>
    }
    return <Button onClick={(e) => navigateToPath(e, '/dashboard')} startIcon={<HomeIcon/>}>Dashboard</Button>
  };

  const getBugListButton = (): JSX.Element => {
    if(!expanded) {
      return <Tooltip placement={'right'} title={'Bugs List'}>
        <IconButton onClick={(e) => navigateToPath(e, '/list')}><ListIcon /></IconButton>
      </Tooltip>
    }
    return <Button onClick={(e) => navigateToPath(e, '/list')} startIcon={<ListIcon/>}>Bugs List</Button>
  };

  const getUserAvatar = (): JSX.Element => {
    if(!expanded) {
      return <Tooltip placement={'right'} title={'Profile'}>
        <Avatar 
          className={'UserAvatar'} 
          alt="Matheus Vaillant" 
          src={ProfileMe} 
          sx={{ width: 30, height: 30 }}
          onClick={(e) => navigateToPath(e, '/profile')}
        />
      </Tooltip>
    }
    return <Button 
      className={'UserAvatar'}
      onClick={(e) => navigateToPath(e, '/profile')}
      startIcon={
        <Avatar alt="Remy Sharp" src={ProfileMe} sx={{ width: 34, height: 34 }}/>
      }
    >
      Profile
    </Button>
  };

  return (
    <div className={classNames('SideMenu', {open: !expanded, closed: expanded})} data-sidebar-section='toggleClose'>
      <IconButton className='Sidebar__expandButton' onClick={setExpanded}>
      {
        !expanded ? <Open /> : <Close />
      }
      </IconButton>

      {getHomeButton()}
      {getBugListButton()}
      {getUserAvatar()}
    </div>
  )
}

export default SideMenu