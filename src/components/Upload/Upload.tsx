import React from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ZoomSectionButton from "../ZoomSectionButton/ZoomSectionButton";
import './_Upload.scss';

const Upload: React.FC = () => {
  return (
    <div className={'Upload'}>
      <ZoomSectionButton />
      <div>
        <FileUploadIcon />
        <h2>Upload a video</h2>
      </div>
    </div>
  )
}

export default Upload