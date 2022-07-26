import React, { useCallback, useEffect, useState } from 'react'
import classNames from "classnames";
import useEventListener from "../../utils/hooks/useEventListener.js";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useToggle from '../../utils/hooks/useToggle';
import { CircularProgress } from "@mui/material";
import FileUploaded from "../FileUploaded/FileUploaded";
import { toastr } from "react-redux-toastr";
import { IFile } from "../../shared/types.js";
import { useSelector } from "react-redux";
import { getBugFiles } from "../../utils/selectors/bug";
import firebaseServices from "../../utils/services/firebaseServices";
import { getAuthUserDataToken } from "../../utils/selectors/auth";
import { getAppTheme } from "../../utils/selectors/theme";

interface UploadProps {
  bugId: string
}

const Upload: React.FC<UploadProps> = ({ bugId }) => {
  const [dragginOver, setDraggingOver] = useState<boolean>(false);
  const [bugFiles, setBugFiles] = useState<IFile[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [zoomSection, setZoomSection] = useToggle();
  
  const inputRef = React.useRef<HTMLInputElement>(null);
  const stateBugFiles = useSelector(getBugFiles(bugId));
  const token = useSelector(getAuthUserDataToken);
  const appTheme = useSelector(getAppTheme);

  useEffect(() => {
    if(stateBugFiles.length && bugId) {
      setBugFiles(stateBugFiles);
    }
  }, [stateBugFiles, bugId]);

  const handleClickAway = useCallback((e) => {
    const shouldUndoZoom = !e.target.closest("[data-zoom-section]");

    if(shouldUndoZoom && zoomSection) {
      setZoomSection();
    }
  }, [setZoomSection, zoomSection]);

  useEventListener('click', handleClickAway);

  const handleDelete = useCallback(async (fileRef) => {
    if(!token) {
      toastr.error('You do not have permission to upload the file to this bug', '');
      return;
    }
    await firebaseServices.removeBugFile(bugFiles, fileRef, bugId);
    setBugFiles(bugFiles.filter(bugFile => bugFile.ref !== fileRef));
  }, [token, bugFiles, bugId]);

  const handleDragOver = useCallback((): void => {
    setDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((): void => {
    setDraggingOver(false);
  }, []);

  const handleUploadFile = useCallback(async (file: File): Promise<void> => {
    if(!token) {
      toastr.error('You do not have permission to upload the file to this bug', '');
      return;
    }

    const fileData = await firebaseServices.uploadBugFile(bugFiles, file, bugId);

    if(fileData) {
      setBugFiles([...bugFiles, fileData]);
    }
  }, [bugId, bugFiles, token]);

  const handleUpload = useCallback( async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      const file = e?.target?.files?.[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if(!file) return;

      if(!allowedTypes.includes(file.type)) {
        toastr.error('Currently we only support uploading images', '');
        return;
      }

      setIsLoading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      await handleUploadFile(file);

    } catch (error) {
      console.log("🚀 ~ file: Upload.tsx ~ line 87 ~ handleUpload ~ error", error);
    } finally {
      setIsLoading(false);
    }
  }, [handleUploadFile]);

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
    <div 
      className={classNames('Upload', {
        zoomSection: zoomSection,
        dark: appTheme === 'dark'
      })} 
      data-zoom-section='toggleClose' 
      aria-label="Click to add file inserted"
    >

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
            onChange={handleUpload} 
            ref={inputRef} 
            data-attr='inputRef' 
          />
        </div>

        <div className={classNames('Upload__files', {})}>

            {bugFiles.map(({ url, ref: fileRef }, index) => {
              console.log("🚀 ~ file: Upload.tsx ~ line 158 ~ {bugFiles.map ~ url", url);
              return (
                <FileUploaded 
                  key={`${fileRef}-${index}`}
                  url={url}
                  fileRef={fileRef}
                  onDelete={handleDelete}
                />
              )
            })}

          </div>

    </div>
  )
}

export default Upload