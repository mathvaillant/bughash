import React, { useCallback, useState } from 'react'
import './_Upload.scss';
import classNames from "classnames";
import useEventListener from "../../utils/hooks/useEventListener.js";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useToggle from '../../utils/hooks/useToggle';
import { CircularProgress } from "@mui/material";
import { BugFile } from "../../shared/types";
import FileUploaded from "../FileUploaded/FileUploaded";

interface UploadProps {
  bugId: string | undefined
}

const Upload: React.FC<UploadProps> = ({ bugId }) => {
  const [bugFiles, setBugFiles] = useState<BugFile[]>([]);
  const [dragginOver, setDraggingOver] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomSection, setZoomSection] = useToggle();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClickAway = useCallback((e) => {
    const shouldUndoZoom = !e.target.closest("[data-zoom-section]");

    if(shouldUndoZoom && zoomSection) {
      setZoomSection();
    }
  }, [setZoomSection, zoomSection]);

  useEventListener('click', handleClickAway);

  const handleDragOver = (): void => {
    setDraggingOver(true);
  };

  const handleDragLeave = (): void => {
    setDraggingOver(false);
  };

  const handleInsertNewFile = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e?.target?.files?.[0];

    if(!file) return;

    const reader = new FileReader();

    setIsLoading(true)

    setTimeout(() => {
      reader.addEventListener('load', () => {
        const result = reader.result as string;

        console.log(file);

        setBugFiles([
          ...bugFiles,
            {
            datablob: result as string,
            type: file.type as string,
            dateAdded: performance.now() as number
          }
        ]);
      })

      reader.readAsDataURL(file);

      setIsLoading(false);
    }, 500)

  }, [bugFiles]);

  const handleOnDrop = useCallback((e: any): void => {
    handleInsertNewFile(e);
    setDraggingOver(false);
  }, [handleInsertNewFile]);
  
  if(isLoading) {
    return <div className={'Upload'}>
      <CircularProgress />
    </div>
  }

  return (
    <div className={classNames('Upload', {zoomSection: zoomSection})} data-zoom-section='toggleClose' aria-label="Click to add file inserted">

      <ZoomSectionButton handleZoomSection={setZoomSection}/>

        <div className={classNames('Upload__inputDiv', {hasFiles: bugFiles.length, dragginOver: dragginOver})}>
          <FileUploadIcon />
          <h2>Upload or Drag and Drop a file</h2>

          <input 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleOnDrop}
            type="file" 
            id="uploadFile" 
            data-test='uploadFile'
            name="filename" 
            onChange={handleInsertNewFile} 
            ref={inputRef} 
            data-attr='inputRef' 
            multiple
          />
        </div>

        {!!(bugFiles.length) && (
          <div className={classNames('Upload__files', {})}>
            {bugFiles.map(({type, datablob, dateAdded}, index) => {
              return <FileUploaded key={`${dateAdded}-${index}`} type={type} datablob={datablob} dateAdded={dateAdded}/>
            })}
          </div>
        )}

    </div>
  )
}

export default Upload