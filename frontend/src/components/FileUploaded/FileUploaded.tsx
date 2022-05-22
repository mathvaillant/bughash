import React from 'react'
import { Delete, Visibility } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import useToggle from "../../utils/hooks/useToggle";
import { getBlobFromFile } from "../../utils/utils";

interface IFileUploaded {
  file?: File,
  onDelete: (file: File) => void
}

export const FileUploaded: React.FC<IFileUploaded> = ({ file = null, onDelete }) => {
  const [expand, setExpand] = useToggle();

  const handleDeleteFile = React.useCallback( async (): Promise<void> => {
    file && onDelete(file);
  }, [file]);

  const handleVisualizeFile = (): void => {
    setExpand();
  };

  const fileData = React.useMemo(() => {
    if(file) {
      const result = getBlobFromFile(file);

      return result;
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

      <img src={fileData?.previewUrl}/>
      {/* { 
        <Tooltip title='Previously uploaded'>
          <CheckIcon/>
        </Tooltip>
      } */}

      <Dialog
        open={expand}
        maxWidth={'lg'}
        onClose={setExpand}
      >
        <DialogContent>
            <img src={fileData?.previewUrl} />
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default FileUploaded