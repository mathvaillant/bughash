import React from 'react'
import { Delete, Visibility } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import useToggle from "../../utils/hooks/useToggle";

interface IFileUploaded {
  file: File,
  onDelete: (file: File) => void
}

export const FileUploaded: React.FC<IFileUploaded> = ({ file, onDelete }) => {
  const [expand, setExpand] = useToggle();

  const handleDeleteFile = React.useCallback((): void => {
    onDelete(file);
  }, [onDelete]);

  const handleVisualizeFile = (): void => {
    setExpand();
  };

  const fileData = React.useMemo(() => {
    const { name, size, type } = file;
    const fileToBlob = new Blob([file]);

    return {
      name,
      size: size/1000,
      type,
      previewUrl: URL.createObjectURL(fileToBlob),
    }
  }, [file]);

  return (
    <div className='FileUploaded'>
      <div className='FileUploaded__options'>
        <IconButton onClick={handleDeleteFile} className={'FileUploaded__deleteBtn'}>
          <Delete />
        </IconButton>
        <IconButton onClick={handleVisualizeFile} className={'FileUploaded__visualizeBtn'}>
          <Visibility />
        </IconButton>
      </div>

      {fileData.type.includes('image') && (
        <img src={fileData.previewUrl} />
      )}

      {fileData.type.includes('video') && (
        <>
          <video width="100%" height="100%" controls>
            <source src={fileData.previewUrl} type={fileData.type} />
          </video>
        </>
      )}

      <Dialog
        open={expand}
        maxWidth={'lg'}
        onClose={setExpand}
      >
        <DialogTitle>
          <Typography>{fileData.name}</Typography>
          <small>{fileData.size.toFixed(2)}KB</small>
        </DialogTitle>

        <DialogContent>
          {fileData.type.includes('image') && (
            <img src={fileData.previewUrl} />
          )}

          {fileData.type.includes('video') && (
            <>
              <video width="100%" height="100%" controls>
                <source src={fileData.previewUrl} type={fileData.type} />
              </video>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default FileUploaded