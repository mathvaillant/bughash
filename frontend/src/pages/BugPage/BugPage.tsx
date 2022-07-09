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

const BugPage: React.FC = () => {
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

      if(!token) {
        toastr.error('You do not have permissions to update the content', '');
        throw new Error();
      }

      const bugData = {
        description: editorContent || null,
        title: bugTitle || 'Untitled',
        status: 'todo',
      } as IBug
        
      await BugServices.updateBug({...bugData, _id: id}, token);  
      toastr.success('Successfully updated!', '');
    
    } catch (error) {
      toastr.error('An error occured white trying to submit the data', '');
    } finally {
      dispatch(hideLoader());
    }

  }, [bugTitle, token, editorContent, id, navigator]);

  useEffect(() => {
    (async () => {
      try {
          dispatch(showLoader());

          if(!id || !token) return;

          const bugData = await BugServices.getSingleBug(id, token);

          const { title, description } = bugData;

          setbugTitle(title);
          setEditorContent(description);

      } catch (error: any) {
        console.log("🚀 ~ file: BugPage.tsx ~ line 69 ~ error", error)
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
            <BugId id={`${id}`}/>
            {
              <Button 
                variant='contained' 
                type='button' 
                className='saveButton' 
                onClick={handleSave}
              >
                Update
              </Button>
            }
          </div>
        </div>

        <div className='BugPage__content'>
          <div>
            {id && <Upload bugId={id} />}
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