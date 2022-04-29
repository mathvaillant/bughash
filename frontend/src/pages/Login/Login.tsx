import React, { ChangeEvent, useEffect, useState } from 'react'
import LoginImg from '../../assets/images/login.jpeg';
import useToggle from "../../utils/hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions/authAction";
import { getAuth, getAuthUserDataToken } from "../../utils/selectors/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { toastr } from "react-redux-toastr";
import { Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import './Login.scss';

const Login: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useToggle();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const authState = useSelector(getAuth);
  const token = useSelector(getAuthUserDataToken);

  const error = authState?.error;
  const loading = authState?.loading;

  useEffect(() => {
    if(error) {
      toastr.error('Could not login', error);
    }

    const tokenStorage = localStorage.getItem('token');
    
    if(token || tokenStorage) {
      navigator('/dashboard');
    }
  }, [error, token, navigator])

  const onChangeEmail = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setEmail(value);

  const onChangePassword = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setPassword(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <div className='Login'>
        <div className="Login__left">
            <div>
              <h2>{'Never forget about crazy bugs anymore.'}</h2>
              <h1>{'Never.'}</h1>
              <h1>{'Anymore.'}</h1>
            </div>
            <img src={LoginImg} alt="" />
        </div>
        <div className="Login__right">
          <form onSubmit={handleSubmit}>

            {loading ? <CircularProgress /> : 
            (
              <>
                <h1>BugHash</h1>

                <FormControl>
                  <InputLabel>Email:</InputLabel>
                  <Input
                    fullWidth={true}
                    type={'email'}
                    value={email}
                    onChange={onChangeEmail}
                />
                </FormControl>

                <FormControl>
                  <InputLabel>Password:</InputLabel>
                  <Input
                    fullWidth={true}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onChangePassword}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={setShowPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                </FormControl>

                <Button type='submit' variant='contained'>Login</Button>
              </>
            )}
          </form>
        </div>
    </div>
  )
}

export default Login