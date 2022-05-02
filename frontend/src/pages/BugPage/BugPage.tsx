import React, { memo, useCallback, useEffect, useState } from 'react'
import _ from "underscore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IBug, IBugFile } from "../../shared/types";
import { getAuthUserDataToken } from "../../utils/selectors/auth";
import { toastr } from "react-redux-toastr";
import { hideLoader, showLoader } from "../../actions/loaderActions/loaderActions";
import BugServices from "../../utils/services/bugServices";
import BugTitle from "../../components/BugTitle/BugTitle";
import Description from "../../components/Description/Description"
import Upload from "../../components/Upload/Upload";
import BugId from "../../components/BugId/BugId";
import { Button } from "@mui/material";
import './BugPage.scss';
import { OutputData } from "@editorjs/editorjs";

const BugPage: React.FC = () => {
  const params = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [bugTitle, setbugTitle] = useState<string>('');
  const [bugFiles, setBugFiles] = useState<IBugFile[]>([]);
  const [editorContent, setEditorContent] = useState<OutputData | undefined>();
  
  const token = useSelector(getAuthUserDataToken);

  const handleChangeTitle = useCallback((value: string): void => setbugTitle(value), []);

  const handleSave = useCallback(async (): Promise<void> => {
    try {
      dispatch(showLoader());

      if(!bugTitle) {
        throw new Error('Please check if both a title and a description were provided.');
      }

      if(!token) {
        throw new Error('You do not have permissions to update the content');
      }

      const bugData = {
        description: editorContent,
        title: bugTitle,
        status: 'todo',
        files: bugFiles
      } as IBug
        
      if(!params.id) {
        await BugServices.openNew(bugData, token); 
        toastr.success('New Bug Open', 'Successfully opened a new bug');
        navigator('/list'); 
        return;
      }
      
      await BugServices.updateBug({...bugData, _id: params.id}, token);  
      toastr.success('New Bug Open', 'Successfully opened a new bug');
    
    } catch (error: any) {
      toastr.error(error.message, '');
    } finally {
      dispatch(hideLoader());
    }

  }, [bugTitle, editorContent, token, bugFiles, params.id, navigator]);

  const handleUploadFile = useCallback((data: IBugFile[]): void => setBugFiles(data), []);

  useEffect(() => {
    if(!params.id) return;

    (async () => {
      try {
          dispatch(showLoader());

          if(!params.id || !token) {
            throw new Error('Permission denied!');
          }

          const bugData = await BugServices.getSingleBug(params.id, token);

          if(!bugData) {
            throw new Error('Could not find the bug');
          }

          const { title, description, files } = bugData;

          setbugTitle(title);
          setBugFiles(files || []);
          setEditorContent(description);

      } catch (error: any) {
        toastr.error(error.message, '');
      } finally {
        dispatch(hideLoader());
      }
    })()
  }, [params.id, token]);

  const handleUpdateEditorContent = useCallback((content: OutputData): void => setEditorContent(content), []);

  return (
    <>
      <div className='BugPage'>
          <div className='BugPage__header'>
            <div></div>
            <div>
              <BugTitle handleChangeTitle={handleChangeTitle} title={bugTitle}/>
              {params.id && <BugId id={`${params.id}`}/>}
              {
                <Button 
                  variant='contained' 
                  type='button' 
                  className='saveButton' 
                  onClick={handleSave}
                >
                  {!params.id ? 'Save' : 'Update'}
                </Button>
              }
            </div>
          </div>

          <div className='BugPage__content'>
            <div>
              <Upload 
                currentFiles={bugFiles}
                handleUploadFile={handleUploadFile}
              />
            </div>
            <div>
              <Description 
                editorContent={editorContent} 
                handleUpdateEditorContent={handleUpdateEditorContent}
              />
            </div>
          </div>
      </div>
    </>
  )
}

export default memo(BugPage);