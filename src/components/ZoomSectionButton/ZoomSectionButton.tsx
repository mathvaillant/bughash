import React, { MouseEvent } from 'react';
import { ZoomOutMap } from '@mui/icons-material';
import { Button } from "@mui/material";
import './_ZoomSectionButton.scss';

const ZoomSectionButton: React.FC = () => {

  const handleZoomSection = (e: MouseEvent<HTMLButtonElement>): void => {
    // use redux to define with section is currently 100% of page...


    /* 

        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0px;
        z-index: 999;
        background: white;

     */
  };

  return <Button className={'ZoomSectionButton'} onClick={handleZoomSection} color={'info'} startIcon={<ZoomOutMap />}></Button>
}

export default ZoomSectionButton