import classNames from "classnames";
import React, { useState } from 'react'
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../utils/constants.js";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import './_Description.scss';

const ReactEditorJS = createReactEditorJS();

const Description: React.FC = () => {
  const [zoomSection, setZoomSection] = useState(false);

  const handleZoomSection = React.useCallback((): void => {setZoomSection(!zoomSection)}, [zoomSection]);

  return (
    <div className={classNames('Description', {zoomSection: zoomSection})}>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          time: 1635603431943,
          blocks: []
        }}
      />
      <ZoomSectionButton handleZoomSection={handleZoomSection}/>
    </div>
  );
}

export default Description