import React, { useCallback, useState } from 'react'
import './_Upload.scss';
import classNames from "classnames";
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { CircularProgress } from "@mui/material";

const Upload: React.FC = () => {
  const [content, setContent] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const [zoomSection, setZoomSection] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleZoomSection = useCallback(() => {setZoomSection(!zoomSection);}, [zoomSection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e?.target?.files?.[0];

    if(!file) return;

    const reader = new FileReader();

    setIsLoading(true)

    reader.addEventListener('load', () => {
      const result = reader.result as string;
      setContent(result);
    })

    reader.readAsDataURL(file);

    setIsLoading(false);
  };
  
  if(isLoading) {
    return <div className={'Upload'}>
      <CircularProgress />
    </div>
  }


  return (
    <div className={classNames('Upload', {zoomSection: zoomSection})}>
      <ZoomSectionButton handleZoomSection={handleZoomSection}/>
        {content ? 
        (
          <img src={content} width='100%' height='100%'/>
        ) 
          : 
        (
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
    </div>
  )
}

export default Upload