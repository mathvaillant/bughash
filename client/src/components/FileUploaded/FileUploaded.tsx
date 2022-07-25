import React from 'react'
import { Delete, Visibility } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import useToggle from "../../utils/hooks/useToggle";

interface IFileUploaded {
  url: string
  fileRef: string
  onDelete: (fileRef: string) => void
}

export const FileUploaded: React.FC<IFileUploaded> = ({ url, fileRef, onDelete }) => {
  const [expand, setExpand] = useToggle();

  const handleDeleteFile = React.useCallback(async (): Promise<void> => onDelete(fileRef), [fileRef]);

  const handleVisualizeFile = (): void => setExpand();

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

      <img src={url}/>

      <Dialog
        open={expand}
        maxWidth={'lg'}
        onClose={setExpand}
      >
        <DialogContent>
            <img src={url} />
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default FileUploaded