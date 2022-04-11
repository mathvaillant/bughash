import React, { useCallback, useEffect, memo } from 'react'
import classNames from "classnames";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../../utils/constants.js";
import useEventListener from "../../utils/hooks/useEventListener.js";
import useToggle from "../../utils/hooks/useToggle";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import './_Description.scss';

interface DescritionProps  {
  bugId: string | undefined
}

const EDITOR_HOLDER_ID = 'editorjs';

const Description: React.FC<DescritionProps> = ({ bugId }) => {
  const [zoomSection, setZoomSection] = useToggle();
  const [editorData, setEditorData] = React.useState<OutputData | undefined>();
  const editorInstance = React.useRef<EditorJS | null>(null);

  const handleClickAway = useCallback((e) => {
    const shouldUndoZoom = !e.target.closest("[data-zoom-section]");

    if(shouldUndoZoom && zoomSection) {
      setZoomSection();
    }
  }, [setZoomSection, zoomSection]);

  useEventListener('click', handleClickAway);

  const initEditor = useCallback((): void => {
    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      logLevel: undefined,
      data: editorData,
      onReady: () => {
        editorInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.saver.save();
        setEditorData(content);
      },
      autofocus: true,
      tools: EDITOR_JS_TOOLS, 
    });
  }, []);

  useEffect(() => {
    if(!editorInstance.current) {
      initEditor();
    }
    return () => {
      editorInstance?.current?.destroy();
      editorInstance.current = null;
    }
  }, [initEditor]);

  return (
    <div 
      className={classNames('Description', {zoomSection: zoomSection})} 
      data-zoom-section='toggleClose' 
      data-test='Description-section'
    >
      <div id={EDITOR_HOLDER_ID}> </div>
      <ZoomSectionButton handleZoomSection={setZoomSection}/>
    </div>
  );
}

export default memo(Description);