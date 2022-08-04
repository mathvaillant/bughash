import React, { Dispatch } from 'react';
import { AddBox } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@mui/material";

import { handleNewBugModal } from "../../actions/modalActions/modalActions";
import { getAppTheme } from "../../utils/selectors/theme";
import { IActionNewBugModal } from "../../actions/modalActions/actionTypes";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getAppTheme);
  const { isMobile } = useDeviceDetect();

  const handleNewDoc = (): (dispatch: Dispatch<IActionNewBugModal>) => Promise<void> => dispatch(handleNewBugModal({ open: true }));

  return (
    <div className='Header'>
      <Tooltip title={'Open a new bug'} placement={'bottom'}>
        <Button className={`AddNew ${theme}`} type='button' onClick={handleNewDoc} data-test={'new-bug'}>
          <AddBox /> {!isMobile ? 'Add a new bug' : 'Add new'}
        </Button>
      </Tooltip>
    </div>
  )
}

export default Header