import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IBug } from "../../shared/types";
import { getAuthUserDataToken } from "../../utils/selectors/auth";
import { toastr } from "react-redux-toastr";
import { hideLoader, showLoader } from "../../actions/loaderActions/loaderActions";
import { OutputData } from "@editorjs/editorjs";
import BugServices from "../../utils/services/bugServices";
import BugTitle from "../../components/BugTitle/BugTitle";
import Description from "../../components/Description/Description"
import Upload from "../../components/Upload/Upload";
import BugId from "../../components/BugId/BugId";
import { Button } from "@mui/material";
import _ from "underscore";
import { getBugsList } from "../../actions/bugActions/bugActions";

const BugPage: React.FC = () => { // token should come thourgh props...
  const params = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [bugTitle, setbugTitle] = useState<string>('');
  const [bugFiles, setBugFiles] = useState<File[]>([]);
  const [editorContent, setEditorContent] = useState<OutputData | undefined>();
  
  const token = useSelector(getAuthUserDataToken);

  const handleChangeTitle = useCallback((value: string): void => setbugTitle(value), []);

  const handleDeleteFile = useCallback((file: File) => {
    const filesUpdated = _.without(bugFiles, file);
    setBugFiles(filesUpdated);
  }, [bugFiles]);

  const handleSave = useCallback(async (): Promise<void> => {
    try {
      dispatch(showLoader());

      if(!bugTitle) {
        toastr.error('Please check if both a title and a description were provided.', '');
        throw new Error();
      }

      if(!token) {
        toastr.error('You do not have permissions to update the content', '');
        throw new Error();
      }

      const bugData = {
        description: editorContent,
        title: bugTitle,
        files: bugFiles,
        status: 'todo',
      } as IBug
        
      if(params.id) {
        await BugServices.updateBug({...bugData, _id: params.id}, token);  
        toastr.success('Successfully updated!', '');
        return;
      }

      await BugServices.openNew(bugData, token);

      toastr.success('New Bug Open', 'Successfully opened a new bug');

      dispatch(getBugsList(token));
    
    } catch (error: any) {
      toastr.error('An error occured white trying to submit the data', '');
    } finally {
      dispatch(hideLoader());
    }

  }, [dispatch, bugTitle, token, editorContent, bugFiles, params.id, navigator]);

  const handleUploadFile = useCallback((data: File[]): void => setBugFiles(data), []);

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
  }, [dispatch, params.id, token]);

  const handleUpdateEditorContent = useCallback((content: OutputData): void => setEditorContent(content), []);

  return (
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
              handleDeleteFile={handleDeleteFile}
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
  )
}

export default memo(BugPage);