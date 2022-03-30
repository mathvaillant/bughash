import React from 'react';
import { ZoomOutMap } from '@mui/icons-material';
import { Button } from "@mui/material";
import './_ZoomSectionButton.scss';

interface ZoomSectionButtonProps {
  handleZoomSection: () => void;
}

const ZoomSectionButton: React.FC<ZoomSectionButtonProps> = ({ handleZoomSection }) => {

  return <Button className={'ZoomSectionButton'} onClickCapture={handleZoomSection} color={'info'} startIcon={<ZoomOutMap />}></Button>
}

export default ZoomSectionButton