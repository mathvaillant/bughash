import React from 'react'
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../utils/constants.js";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import './_Description.scss';

const ReactEditorJS = createReactEditorJS();

const Description: React.FC = () => {
  return (
    <div className='Description'>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          time: 1635603431943,
          blocks: []
        }}
      />
      <ZoomSectionButton />
    </div>
  );
}

export default Description