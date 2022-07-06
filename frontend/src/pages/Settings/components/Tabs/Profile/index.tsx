import React from 'react'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { getAuthUserData } from "../../../../../utils/selectors/auth";
import userServices from "../../../../../utils/services/userServices";
import { toastr } from "react-redux-toastr";
import firebaseServices from '../../../../../utils/services/firebase'
import { Edit } from "@mui/icons-material";

const Profile: React.FC = () => {
  const [email, setEmail] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  const stateUserData = useSelector(getAuthUserData);

  React.useEffect(() => {
    if(stateUserData) {
      const { email: useremail, name: username, avatarUrl: avatar, token: usertoken, _id } = stateUserData;

      setEmail(useremail || null);
      setName(username || null);
      setAvatarUrl(avatar || '');
      setToken(usertoken || null);
      setUserId(_id || null);
    }
  }, [stateUserData]);

  if(!email || !name || !userId || !token) return null;

  const handleChangeEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setEmail(value);
  const handleChangeName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setName(value);

  const handleAvatarUpload = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if(!files) return;

    const newUrl = await firebaseServices.updateUserAvatar(files[0], userId, token);
    
    const lsUser = JSON.parse(localStorage.getItem('ls_db_user_info') as string);
    localStorage.setItem('ls_db_user_info', JSON.stringify({...lsUser, avatarUrl: newUrl}));

    setAvatarUrl(newUrl);
  };

  const handleSave = async (): Promise<void> => {
    try {
      setIsLoading(true);

      await userServices.updateData({ name, email }, userId, token);

      const lsUser = JSON.parse(localStorage.getItem('ls_db_user_info') as string);
      JSON.stringify({...lsUser, name, email});

      toastr.success('Updated', 'Successfully updated');

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Profile">

      <div className="Profile__left">
        <div className="Profile__left__inputWrapper">
          <Avatar
            alt="Remy Sharp"
            src={avatarUrl}
            sx={{ width: 60, height: 60 }}
          />

          <Edit />

          <input 
            type="file" 
            onChange={handleAvatarUpload}
          />
        </div>
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
            className="Profile__right__cancel" 
            size="small" 
            variant='outlined'
          >
            Cancel
          </Button>
          <LoadingButton 
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