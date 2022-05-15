import React, { useCallback, useState } from 'react'
import classNames from "classnames";
import useEventListener from "../../utils/hooks/useEventListener.js";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useToggle from '../../utils/hooks/useToggle';
import { CircularProgress } from "@mui/material";
import FileUploaded from "../FileUploaded/FileUploaded";

interface UploadProps {
  currentFiles: File[]
  handleUploadFile: (data: File[]) => void,
  handleDeleteFile: (file: File) => void
}

const Upload: React.FC<UploadProps> = ({ currentFiles = [], handleUploadFile, handleDeleteFile}) => {
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

  const handleDelete = useCallback((file) => {
    handleDeleteFile(file);
  }, [handleDeleteFile]);

  const handleDragOver = useCallback((): void => {
    setDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((): void => {
    setDraggingOver(false);
  }, []);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e?.target?.files?.[0];

    if(!file) return;

    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    setTimeout(() => {
      setIsLoading(false);
      handleUploadFile([...currentFiles, file]);
    }, 200)

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
            {currentFiles.map((file, index) => {
              return (
                <FileUploaded 
                  key={index} 
                  file={file}
                  onDelete={handleDelete}
                />
              )
            })}
          </div>
        )}

    </div>
  )
}

export default Upload