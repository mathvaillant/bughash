import React from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import './_Upload.scss';

const Upload: React.FC = () => {
  return (
    <div className={'Upload'}>
      <div>
        <FileUploadIcon />
        <h2>Upload a video of what is happening</h2>
      </div>
    </div>
  )
}

export default Upload