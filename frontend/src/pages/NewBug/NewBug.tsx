import { Button } from "@mui/material";
import React, { useCallback, useState } from 'react'
import { useParams } from "react-router";
import BugId from "../../components/BugId/BugId";
import BugTitle from "../../components/BugTitle/BugTitle";
import Description from "../../components/Description/Description"
import Upload from "../../components/Upload/Upload";
import { BugFile } from "../../shared/types";
import { useTypedSelector } from "../../utils/hooks/useTypeSelector";
import './_NewBug.scss';

const NewBug: React.FC = () => {
  const params = useParams();
  const [title, setTitle] = useState<string>('Bug Title');
  const [bugFiles, setBugFiles] = useState<BugFile[]>([]);
  
  const bugDescription = useTypedSelector(state => state.bugDescription);

  const handleChangeTitle = (value: string): void => setTitle(value);

  const handleSaveNewBug = useCallback((): void => {
    const bugData = {
      bugDescription,
      bugId: params.id as string,
      title,
      status: 'todo' as string,
      files: bugFiles
    }
    // await dispatch(saveNewBug(description, bugFiles, title, bugId));
    console.log(bugData);
  }, [bugDescription, params.id, title, bugFiles]);

  const handleUploadFile = useCallback((data: BugFile[]): void => setBugFiles(data), []);

  return (
    <>
      <div className='NewBug'>
          <div className='NewBug__header'>
            <div></div>
            <div>
              <BugTitle handleChangeTitle={handleChangeTitle} title={title}/>
              <BugId id={`${params.id}`}/>
              <Button variant='contained' type='button' className='saveButton' onClick={handleSaveNewBug}>Save</Button>
            </div>
          </div>

          <div className='NewBug__content'>
            <div>
              <Upload 
                bugId={params.id} 
                currentFiles={bugFiles}
                handleUploadFile={handleUploadFile}
              />
            </div>
            <div>
              <Description bugId={params.id} />
            </div>
          </div>
      </div>
    </>
  )
}

export default NewBug