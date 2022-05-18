import React from 'react'
import { Delete, Visibility } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import useToggle from "../../utils/hooks/useToggle";

interface IFileUploaded {
  file?: File,
  onDelete: (file: File) => void
  srcUrl?: string
  previouslyUploaded?: boolean
}

export const FileUploaded: React.FC<IFileUploaded> = ({ file = null, onDelete, srcUrl, previouslyUploaded = false }) => {
  const [expand, setExpand] = useToggle();

  const handleDeleteFile = React.useCallback((): void => {
    file && onDelete(file);
  }, [onDelete]);

  const handleVisualizeFile = (): void => {
    setExpand();
  };

  const fileData = React.useMemo(() => {
    if(file) {
      const { name, size, type } = file;
      const fileToBlob = new Blob([file]);

      return {
        name,
        size: size/1000,
        type,
        previewUrl: URL.createObjectURL(fileToBlob),
      }
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

      {previouslyUploaded ? (
        <img src={srcUrl} />
      ) : (
        <img src={fileData?.previewUrl}/>
      )}

      <Dialog
        open={expand}
        maxWidth={'lg'}
        onClose={setExpand}
      >
        <DialogContent>
            <img src={fileData?.previewUrl || srcUrl} />
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default FileUploaded