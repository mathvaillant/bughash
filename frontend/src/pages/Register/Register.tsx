import React, { ChangeEvent, useEffect, useState } from 'react'
import RegisterImg from '../../assets/images/login.jpeg';
import useToggle from "../../utils/hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions/authAction";
import { getAuth, getAuthUserDataEmail, getAuthUserDataName, getAuthUserDataRole } from "../../utils/selectors/auth";
import { IUser } from "../../shared/types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import './Register.scss';

const Register: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useToggle();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const authState = useSelector(getAuth);
  const userName = useSelector(getAuthUserDataName);
  const userEmail = useSelector(getAuthUserDataEmail);
  const role = useSelector(getAuthUserDataRole);

  const error = authState?.error;
  const loading = authState?.loading;

  useEffect(() => {
    if(error) {
      toast.error(error);
    }

    if(userName && userEmail) {
      navigator('/dashboard');
    }
  }, [error, userName, userEmail, navigator])

  const onChangeEmail = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setEmail(value);

  const onChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setName(value);

  const onChangePassword = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setPassword(value);

  const handleRegisterAsGuest = (): void => navigator('/dashboard');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }

  return (
    <div className='Register'>
        <div className="Register__left">
            <div>
              <h2>{'Never forget about crazy bugs anymore.'}</h2>
              <h1>{'Never.'}</h1>
              <h1>{'Anymore.'}</h1>
            </div>
            <img src={RegisterImg} alt="" />
        </div>
        <div className="Register__right">
          <form onSubmit={handleSubmit}>

            {loading ? <CircularProgress /> : 
            (
              <>
                <h1>BugHash</h1>
                
                <FormControl>
                  <InputLabel>Name:</InputLabel>
                  <Input
                    fullWidth={true}
                    type={'text'}
                    value={name}
                    onChange={onChangeName}
                />
                </FormControl>

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

                <Button type='submit' variant='contained'>Register</Button>
                <Button type='button' variant='outlined' onClick={handleRegisterAsGuest}>Enter as a guest</Button>
              </>
            )}
          </form>
        </div>
    </div>
  )
}

export default Register