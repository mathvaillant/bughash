import React from 'react';
import { ZoomOutMap } from '@mui/icons-material';
import { IconButton } from "@mui/material";

interface ZoomSectionButtonProps {
  handleZoomSection: () => void;
}

const ZoomSectionButton: React.FC<ZoomSectionButtonProps> = ({ handleZoomSection }) => {

  return <IconButton className={'ZoomSectionButton'} onClickCapture={handleZoomSection} color={'info'}><ZoomOutMap /></IconButton>
}

export default ZoomSectionButton