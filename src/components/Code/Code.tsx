import React, { useState } from 'react'
import classNames from "classnames";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";

const Code: React.FC = () => {
  const [zoomSection, setZoomSection] = useState(false);

  const handleZoomSection = React.useCallback((): void => {setZoomSection(!zoomSection)}, [zoomSection]);

  return (
    <div className={classNames('Code', {zoomSection: zoomSection})}>
      <ZoomSectionButton handleZoomSection={handleZoomSection} />
    </div>
  )
}

export default Code