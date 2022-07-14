import React from 'react';
import { AddBox } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@mui/material";

import { handleNewBugModal } from "../../actions/modalActions/modalActions";
import ThemeMode from "../ThemeMode/ThemeMode";
import { getAppTheme } from "../../utils/selectors/theme";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getAppTheme);

  const handleNewDoc = (): void => {
    dispatch(handleNewBugModal({ open: true }));
  };

  return (
    <div className='Header'>
      <Tooltip title={'Open a new bug'} placement={'bottom'}>
        <Button className={`BugPage ${theme}`} type='button' onClick={handleNewDoc} data-test={'new-bug'}>
          <AddBox /> New
        </Button>
      </Tooltip>
      
      <ThemeMode />
    </div>
  )
}

export default Header