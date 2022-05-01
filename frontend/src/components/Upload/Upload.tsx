import React, { useCallback, useState } from 'react'
import './_Upload.scss';
import classNames from "classnames";
import useEventListener from "../../utils/hooks/useEventListener.js";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useToggle from '../../utils/hooks/useToggle';
import { CircularProgress } from "@mui/material";
import { IBugFile } from "../../shared/types";
import FileUploaded from "../FileUploaded/FileUploaded";

interface UploadProps {
  currentFiles: IBugFile[]
  handleUploadFile: (data: IBugFile[]) => void,
}

const Upload: React.FC<UploadProps> = ({ currentFiles = [], handleUploadFile}) => {
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

  const handleDragOver = useCallback((): void => {
    setDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((): void => {
    setDraggingOver(false);
  }, []);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e?.target?.files?.[0];

    if(!file) return;

    const reader = new FileReader();

    setIsLoading(true)

    setTimeout(() => {
      reader.addEventListener('load', () => {
        const result = reader.result as string;

        handleUploadFile([
          ...currentFiles,
          {
            datablob: result as string,
            type: file.type as string,
            dateAdded: Date.now()
          }
        ]);
      })

      reader.readAsDataURL(file);

      setIsLoading(false);
    }, 500)

  }, [currentFiles, handleUploadFile]);

  const handleOnDrop = useCallback((e: never): void => {
    handleUpload(e);
    setDraggingOver(false);
  }, [handleUpload]);
  
  if(isLoading) {
    return <div className={'Upload'}>
      <CircularProgress />
    </div>
  }

  return (
    <div className={classNames('Upload', {zoomSection: zoomSection})} data-zoom-section='toggleClose' aria-label="Click to add file inserted">

      <ZoomSectionButton handleZoomSection={setZoomSection}/>

        <div className={classNames('Upload__inputDiv', {hasFiles: currentFiles.length, dragginOver: dragginOver})}>
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
            onChange={handleUpload} 
            ref={inputRef} 
            data-attr='inputRef' 
            multiple
          />
        </div>

        {!!(currentFiles.length) && (
          <div className={classNames('Upload__files', {})}>
            {currentFiles.map(({type, datablob, dateAdded}, index) => {
              return (
                <FileUploaded 
                  key={`${dateAdded}-${index}`} 
                  type={type} 
                  datablob={datablob} 
                  dateAdded={dateAdded}
                />
              )
            })}
          </div>
        )}

    </div>
  )
}

export default Upload