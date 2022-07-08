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
  const { id } = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [bugTitle, setbugTitle] = useState<string>('');
  const [editorContent, setEditorContent] = useState<OutputData | undefined>();
  
  const token = useSelector(getAuthUserDataToken);

  const handleChangeTitle = useCallback((value: string): void => setbugTitle(value), []);

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
        status: 'todo',
      } as IBug
        
      if(id) {
        await BugServices.updateBug({...bugData, _id: id}, token);  
        toastr.success('Successfully updated!', '');
        return;
      }

      await BugServices.openNew(bugData, token);

      navigator('/list');
      dispatch(getBugsList(token));
      toastr.success('Successfully opened a new bug', '');
    
    } catch (error) {
      toastr.error('An error occured white trying to submit the data', '');
    } finally {
      dispatch(hideLoader());
    }

  }, [bugTitle, token, editorContent, id, navigator]);

  useEffect(() => {
    if(!id) return 

    (async () => {
      try {
          dispatch(showLoader());

          if(!token) {
            throw new Error('Permission denied!');
          }

          const bugData = await BugServices.getSingleBug(id, token);

          if(!bugData) {
            throw new Error('Could not find the bug');
          }

          const { title, description } = bugData;

          setbugTitle(title);
          setEditorContent(description);

      } catch (error: any) {
        toastr.error(error.message, '');
      } finally {
        dispatch(hideLoader());
      }
    })()
  }, [dispatch, id, token]);

  const handleUpdateEditorContent = useCallback((content: OutputData): void => setEditorContent(content), []);

  return (
    <div className='BugPage'>
        <div className='BugPage__header'>
          <div></div>
          <div>
            <BugTitle handleChangeTitle={handleChangeTitle} title={bugTitle}/>
            {id && <BugId id={`${id}`}/>}
            {
              <Button 
                variant='contained' 
                type='button' 
                className='saveButton' 
                onClick={handleSave}
              >
                {!id ? 'Save' : 'Update'}
              </Button>
            }
          </div>
        </div>

        <div className='BugPage__content'>
          <div>
            <Upload bugId={id || ''} />
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