import React, { useCallback, useState } from 'react'
import './_Upload.scss';
import classNames from "classnames";
import useEventListener from "../../utils/hooks/useEventListener.js";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useToggle from '../../utils/hooks/useToggle';
import { CircularProgress, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Upload: React.FC = () => {
  const [content, setContent] = useState<{datablob: string, type: string} | null | undefined>(null);
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

  const handleRemoveFile = (): void => setContent(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e?.target?.files?.[0];

    if(!file) return;

    const reader = new FileReader();

    setIsLoading(true)

    setTimeout(() => {
      reader.addEventListener('load', () => {
        const result = reader.result as string;

        console.log(file);

        setContent({
          datablob: result as string,
          type: file.type as string
        });
      })

      reader.readAsDataURL(file);

      setIsLoading(false);
    }, 500)

  }, []);
  
  if(isLoading) {
    return <div className={'Upload'}>
      <CircularProgress />
    </div>
  }

  return (
    <div className={classNames('Upload', {zoomSection: zoomSection})} data-zoom-section='toggleClose' aria-label="Click to add file inserted">
      <ZoomSectionButton handleZoomSection={setZoomSection}/>
      {content && (
          <IconButton onClick={handleRemoveFile} className={'Upload__deleteFiles'} color="primary" aria-label="remove file inserted">
          <Delete />
        </IconButton>
      )}
      <>
        {!content && (
          <>
            <div>
            <FileUploadIcon />
            <h2>Upload a video</h2>
            </div>
            <input 
              type="file" 
              id="uploadFile" 
              data-test='uploadFile'
              name="filename" 
              onChange={handleChange} 
              ref={inputRef} 
              data-attr='inputRef' 
              multiple
            />
          </>
        )}

        {content?.type.includes('image') && <img src={content.datablob} width='auto' height='100%'/>}

        {content?.type.includes('video') && (
          <>
            <video width="100%" height="100%" controls>
            <source src={content.datablob} type={content.type} />
          </video>
          </>
        )}
      </>
    </div>
  )
}

export default Upload