import { Button } from "@mui/material";
import React, { useCallback, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IBug, IBugFile } from "../../shared/types";
import { getBugDescription } from "../../utils/selectors/bug";
import { getAuthUserDataToken } from "../../utils/selectors/auth";
import { toastr } from "react-redux-toastr";
import BugId from "../../components/BugId/BugId";
import BugTitle from "../../components/BugTitle/BugTitle";
import Description from "../../components/Description/Description"
import Upload from "../../components/Upload/Upload";
import BugServices from "../../utils/services/bugServices";
import './_NewBug.scss';

const NewBug: React.FC = () => {
  const params = useParams();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [bugFiles, setBugFiles] = useState<IBugFile[]>([]);
  
  const bugDescription = useSelector(getBugDescription);
  const token = useSelector(getAuthUserDataToken);

  const handleChangeTitle = (value: string): void => setTitle(value);

  const handleSaveNewBug = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const bugData = {
        description: bugDescription,
        title,
        status: 'todo',
        files: bugFiles
      } as IBug
        
      await BugServices.openNew(bugData, token);  
      toastr.success('New Bug Open', 'Successfully opened a new bug');
      navigator('/list');
    } catch (error: any) {
      toastr.error('Could not open the new bug', 'Please check if bath a title and a description were provided.');
    } finally {
      setIsLoading(false);
    }

  }, [bugDescription, title, bugFiles, token, navigator]);

  const handleUploadFile = useCallback((data: IBugFile[]): void => setBugFiles(data), []);

  return (
    <>
      <div className='NewBug'>
          <div className='NewBug__header'>
            <div></div>
            <div>
              <BugTitle handleChangeTitle={handleChangeTitle} title={title}/>
              {params.id && <BugId id={`${params.id}`}/>}
              {!params.id && <Button variant='contained' type='button' className='saveButton' onClick={handleSaveNewBug}>Save</Button>}
            </div>
          </div>

          <div className='NewBug__content'>
            <div>
              <Upload 
                currentFiles={bugFiles}
                handleUploadFile={handleUploadFile}
              />
            </div>
            <div>
              <Description />
            </div>
          </div>
      </div>
    </>
  )
}

export default NewBug