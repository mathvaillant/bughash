import classNames from "classnames";
import React, { useState } from 'react'
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";

const Solution: React.FC = () => {
  const [zoomSection, setZoomSection] = useState(false);

  const handleZoomSection = React.useCallback((): void => {setZoomSection(!zoomSection)}, [zoomSection]);

  return (
    <div className={classNames('Solution', {zoomSection: zoomSection})}>
      <ZoomSectionButton handleZoomSection={handleZoomSection}/>
    </div>
  )
}

export default Solution