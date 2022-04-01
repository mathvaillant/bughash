import classNames from "classnames";
import React, { useCallback } from 'react'
import useEventListener from "../../utils/hooks/useEventListener.js";
import useToggle from "../../utils/hooks/useToggle";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";

interface SolutionProps {
  bugId: string | undefined
}

const Solution: React.FC<SolutionProps> = ({ bugId }) => {
  const [zoomSection, setZoomSection] = useToggle();

  const handleClickAway = useCallback((e) => {
    const shouldUndoZoom = !e.target.closest("[data-zoom-section]");

    if(shouldUndoZoom && zoomSection) {
      setZoomSection();
    }
  }, [setZoomSection, zoomSection]);

  useEventListener('click', handleClickAway);

  return (
    <div className={classNames('Solution', {zoomSection: zoomSection})} data-zoom-section='toggleClose'>
      <ZoomSectionButton handleZoomSection={setZoomSection}/>
    </div>
  )
}

export default Solution