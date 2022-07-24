import React, { ChangeEvent, Dispatch } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from "react-redux";
import { getModalState } from "../../utils/selectors/modals";
import { handleNewBugModal } from "../../actions/modalActions/modalActions";
import { IActionNewBugModal } from '../../actions/modalActions/actionTypes'
import BugServices from "../../utils/services/bugServices";
import { getAuthUserDataToken } from "../../utils/selectors/auth";
import { useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../../actions/loaderActions/loaderActions";
import { getBugsList } from "../../actions/bugActions/bugActions";
import { toastr } from "react-redux-toastr";

const NewBugModal: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string>('');
  const modalState = useSelector(getModalState('newbug'));
  const token = useSelector(getAuthUserDataToken);

  if(!modalState || !token) return null;

  const handleClose = (): (dispatch: React.Dispatch<IActionNewBugModal>) => Promise<void> => dispatch(handleNewBugModal({ open: false }));

  const handleAddNew = async (): Promise<void> => {
    try {
      dispatch(showLoader());

      const { message, status, newBug } = await BugServices.openNew({
        fields: {
          title
        } 
      });

      if(status !== 'ok' || !newBug) {
        throw new Error(message);
      }

      dispatch(getBugsList(token));
      handleClose();
      setTitle('');
      dispatch(hideLoader());
      navigate(`/edit/${newBug._id}`);
      
    } catch (error: any) {
      toastr.error(error, '');
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value);

  return (
    <Dialog fullWidth open={Boolean(modalState?.open)} onClose={handleClose}>
      <DialogTitle>Add new Bug 🐞</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="bugname"
          label="Bug Name"
          type="text"
          variant="standard"
          onChange={handleChange}
          value={title}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddNew}>Add New</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewBugModal;