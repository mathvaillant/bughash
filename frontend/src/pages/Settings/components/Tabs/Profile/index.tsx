import React from 'react'
import ProfileMe from '../../../../../assets/images/profile.png';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { getAuthUserDataEmail, getAuthUserDataId, getAuthUserDataName, getAuthUserDataToken } from "../../../../../utils/selectors/auth";
import { IUser } from "../../../../../shared/types";
import userServices from "../../../../../utils/services/userServices";
import { toastr } from "react-redux-toastr";

const Profile: React.FC = () => {
  const userEmail = useSelector(getAuthUserDataEmail);
  const userName = useSelector(getAuthUserDataName);
  const userId = useSelector(getAuthUserDataId);
  const token = useSelector(getAuthUserDataToken);

  const [email, setEmail] = React.useState<string | null>(userEmail);
  const [name, setName] = React.useState<string | null>(userName);
  const [isLoading, setIsLoading] = React.useState(false);

  if(!userEmail || !userName || !userId) return null;

  const handleChangeEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setEmail(value);
  const handleChangeName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setName(value);

  const handleSave = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const newUserData: IUser = {
        email,
        name,
        _id: userId,
        token 
      };

      const { name: newName, email: newEmail } = await userServices.updateData(newUserData);

      setEmail(newEmail || email);
      setName(newName || name);

      localStorage.setItem('ls_db_user_info', JSON.stringify(newUserData));

      toastr.success('Updated', 'Successfully updated');

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Profile">

      <div className="Profile__left">
        <Avatar
          alt="Remy Sharp"
          src={ProfileMe}
          sx={{ width: 100, height: 100 }}
        />
      </div>

      <div className="Profile__right">
        <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth: '400px'}}>
          <AlternateEmailIcon fontSize="small" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField 
            fullWidth 
            id="input-with-sx" 
            label="Email" 
            variant="standard" 
            value={email}
            onChange={handleChangeEmail}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth: '400px'}}>
          <PersonIcon fontSize="small" sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <TextField 
            fullWidth 
            id="input-with-sx" 
            label="Name" 
            variant="standard" 
            value={name}
            onChange={handleChangeName}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', maxWidth: '400px', gap: '1rem'}}>
          <Button
            disabled={email === userEmail && name === userName} 
            className="Profile__right__cancel" 
            size="small" 
            variant='outlined'
          >
            Cancel
          </Button>
          <LoadingButton 
            disabled={email === userEmail && name === userName}
            loading={isLoading}
            className="Profile__right__save" 
            size="small" 
            variant='contained'
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Box>
        
      </div>
      
    </div>
  )
}

export default Profile