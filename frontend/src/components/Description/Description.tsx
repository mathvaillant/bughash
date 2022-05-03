import React, { memo, useCallback, useEffect } from 'react'
import EditorJS, { OutputData } from "@editorjs/editorjs";
import classNames from "classnames";
import { EDITOR_JS_TOOLS } from "../../utils/constants.js";
import useEventListener from "../../utils/hooks/useEventListener.js";
import useToggle from "../../utils/hooks/useToggle";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import './_Description.scss';
import _ from "underscore";

const EDITOR_HOLDER_ID = 'editorjs';

interface DescriptionProps {
  editorContent: OutputData | undefined
  handleUpdateEditorContent: (content: OutputData)=> void
}

const Description: React.FC<DescriptionProps> = ({ editorContent, handleUpdateEditorContent }) => {
  const [zoomSection, setZoomSection] = useToggle();
  const editorInstance = React.useRef<EditorJS | null>(null);

  const handleClickAway = useCallback((e) => {
    const shouldUndoZoom = !e.target.closest("[data-zoom-section]");

    if(shouldUndoZoom && zoomSection) {
      setZoomSection();
    }
  }, [setZoomSection, zoomSection]);

  useEventListener('click', handleClickAway);

  const destroyEditor = useCallback(() => {
    editorInstance?.current?.destroy();
    editorInstance.current = null;
  }, []); 

  const initEditor = useCallback((): void => {
    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      logLevel: undefined,
      data: editorContent,
      onReady: () => {
        if(!editorInstance.current) {
          editorInstance.current = editor;
        } else {
          destroyEditor();
          initEditor();
        }
      },
      onChange: async () => {
        const content = await editor.saver.save();
        if(!_.isEqual(content.blocks, editorContent?.blocks)) {
          handleUpdateEditorContent(content); 
        }
      },
      autofocus: true,
      tools: EDITOR_JS_TOOLS, 
    });
  }, [editorContent, destroyEditor]);

  useEffect(() => {
    if(!editorInstance.current) {
      initEditor();
    }

    return () => {
      destroyEditor
    }
  }, [initEditor, destroyEditor]);

  return (
    <div 
      className={classNames('Description', {zoomSection: zoomSection})} 
      data-zoom-section='toggleClose' 
      data-test='Description-section'
    >
      <div id={EDITOR_HOLDER_ID}> </div>
      <ZoomSectionButton handleZoomSection={setZoomSection} />
    </div>
  );
}

export default memo(Description);