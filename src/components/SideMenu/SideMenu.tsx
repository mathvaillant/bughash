import React, { useCallback } from 'react';
import { IconButton } from "@mui/material";
import classNames from "classnames";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Open from '@mui/icons-material/KeyboardArrowRight';
import Close from '@mui/icons-material/KeyboardArrowLeft';
import useEventListener from "../../utils/hooks/useEventListener.js";
import CodeIcon from '@mui/icons-material/Code';
import useToggle from "../../utils/hooks/useToggle";
import './SideMenu.scss';

const SideMenu: React.FC = () => {
  const [expanded, setExpanded] = useToggle();

  const handleClickAway = useCallback((e) => {
    const shouldResize = !e.target.closest("[data-sidebar-section]");

    if(shouldResize && expanded) {
      setExpanded();
    }
  }, [setExpanded, expanded]);

  useEventListener('click', handleClickAway);

  return (
    <div className={classNames('SideMenu', {open: !expanded, closed: expanded})} data-sidebar-section='toggleClose'>
      <IconButton className='Sidebar__expandButton' onClick={setExpanded}>
      {
        !expanded ? <Open /> : <Close />
      }
      </IconButton>
      <IconButton><PermMediaIcon /></IconButton>
      <IconButton><CodeIcon /></IconButton>
    </div>
  )
}

export default SideMenu