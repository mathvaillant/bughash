import React, { memo, useCallback, useEffect } from 'react'
import EditorJS, { OutputData } from "@editorjs/editorjs";
import classNames from "classnames";
import { EDITOR_JS_TOOLS } from "../../utils/constants.js";
import useEventListener from "../../utils/hooks/useEventListener.js";
import useToggle from "../../utils/hooks/useToggle";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import _ from "underscore";
import { useSelector } from "react-redux";
import { getBugDescription } from "../../utils/selectors/bug";
import BugServices from "../../utils/services/bugServices";
import useDebounce from "../../utils/hooks/useDebounce";
import { getAppTheme } from "../../utils/selectors/theme";

const EDITOR_HOLDER_ID = 'editorjs';

const Description = ({ bugId }: { bugId: string }): JSX.Element => {
  const [zoomSection, setZoomSection] = useToggle();
  const [editorContent, setEditorContent] = React.useState<OutputData | undefined>();
  const editorInstance = React.useRef<EditorJS | null>(null);
  const stateEditorContent = useSelector(getBugDescription(bugId));
  const appTheme = useSelector(getAppTheme);

  const handleUpdateEditorContent = useCallback((content: OutputData): void => setEditorContent(content), []);

  const handleSaveDescription = useCallback(async (): Promise<void> => {
    await BugServices.updateBug({
      bugId,
      fields: {
        description: editorContent
      }
    });
  }, [editorContent, bugId]);

  useDebounce(() => {
    if(editorContent) {
      handleSaveDescription();
    }
  }, 750, [editorContent]);

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
  }, [editorContent, destroyEditor, handleUpdateEditorContent]);

  useEffect(() => {
    if(stateEditorContent && bugId) {
      setEditorContent(stateEditorContent);
    }
  }, [stateEditorContent, bugId]);

  useEffect(() => {
    if(!editorInstance.current) {
      initEditor();
    }
  }, [initEditor]);

  return (
    <div 
      className={classNames('Description', {
        zoomSection: zoomSection,
        dark: appTheme === 'dark'
      })} 
      data-zoom-section='toggleClose' 
      data-test='Description-section'
    >
      <div id={EDITOR_HOLDER_ID}> </div>
      <ZoomSectionButton handleZoomSection={setZoomSection} />
    </div>
  );
}

export default memo(Description);