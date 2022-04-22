import React from 'react'
import { IBugFile } from "../../shared/types";
import { Delete, Visibility } from "@mui/icons-material";
import './FileUploaded.scss';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import useToggle from "../../utils/hooks/useToggle";

export const FileUploaded: React.FC<IBugFile> = ({ datablob, type, dateAdded }) => {
  const [expand, setExpand] = useToggle();

  const handleDeleteFile = (): void => {
    // delete file...
  };

  const handleVisualizeFile = (): void => {
    setExpand();
  };

  return <div className={'FileUploaded'}>
    <div className='FileUploaded__options'>
      <IconButton onClick={handleDeleteFile} className={'FileUploaded__deleteBtn'}>
        <Delete />
      </IconButton>
      <IconButton onClick={handleVisualizeFile} className={'FileUploaded__visualizeBtn'}>
        <Visibility />
      </IconButton>
    </div>

    {type.includes('image') && (
      <img src={datablob} />
    )}

    {type.includes('video') && (
      <>
        <video width="100%" height="100%" controls>
          <source src={datablob} type={type} />
        </video>
      </>
    )}

    <Dialog
      open={expand}
      maxWidth={'lg'}
      onClose={setExpand}
    >
      <DialogTitle>
        <Typography>name of the file here</Typography>
      </DialogTitle>

      <DialogContent>
        {type.includes('image') && (
          <img src={datablob} />
        )}

        {type.includes('video') && (
          <>
            <video width="100%" height="100%" controls>
              <source src={datablob} type={type} />
            </video>
          </>
        )}
      </DialogContent>
    </Dialog>
  </div>
};

export default FileUploaded