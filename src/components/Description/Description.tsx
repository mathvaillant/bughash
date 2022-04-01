import classNames from "classnames";
import React, { useCallback } from 'react'
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../utils/constants.js";
import useEventListener from "../../utils/hooks/useEventListener.js";
import useToggle from "../../utils/hooks/useToggle";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import './_Description.scss';

interface DescritionProps  {
  bugId: string | undefined
}

const ReactEditorJS = createReactEditorJS();

const Description: React.FC<DescritionProps> = ({ bugId }) => {
  const [zoomSection, setZoomSection] = useToggle();

  const handleClickAway = useCallback((e) => {
    const shouldUndoZoom = !e.target.closest("[data-zoom-section]");

    if(shouldUndoZoom && zoomSection) {
      setZoomSection();
    }
  }, [setZoomSection, zoomSection]);

  useEventListener('click', handleClickAway);

  return (
    <div className={classNames('Description', {zoomSection: zoomSection})} data-zoom-section='toggleClose' data-test='Description-section'>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          time: 1635603431943,
          blocks: []
        }}
      />
      <ZoomSectionButton handleZoomSection={setZoomSection}/>
    </div>
  );
}

export default Description