import React, { useCallback } from 'react'
import classNames from "classnames";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import useToggle from "../../utils/hooks/useToggle";
import useEventListener from "../../utils/hooks/useEventListener.js";

interface CodeProps {
  bugId: string | undefined
}

const Code: React.FC<CodeProps> = ({ bugId }) => {
  const [zoomSection, setZoomSection] = useToggle();

  const handleClickAway = useCallback((e) => {
    const shouldUndoZoom = !e.target.closest("[data-zoom-section]");

    if(shouldUndoZoom && zoomSection) {
      setZoomSection();
    }
  }, [setZoomSection, zoomSection]);

  useEventListener('click', handleClickAway);

  return (
    <div className={classNames('Code', {zoomSection: zoomSection})} data-zoom-section='toggleClose'>
      <ZoomSectionButton handleZoomSection={setZoomSection} />
    </div>
  )
}

export default Code