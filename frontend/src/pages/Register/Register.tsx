import React, { ChangeEvent, useEffect, useState } from 'react'
import RegisterImg from '../../assets/images/login.jpeg';
import useToggle from "../../utils/hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions/authAction";
import { getAuth, getAuthUserDataToken } from "../../utils/selectors/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import './Register.scss';

const Register: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useToggle();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const authState = useSelector(getAuth);
  const token = useSelector(getAuthUserDataToken);

  const error = authState?.error;
  const loading = authState?.loading;

  useEffect(() => {
    if(error) {
      toast.error(error);
    }

    const tokenStorage = localStorage.getItem('token');
    
    if(token || tokenStorage) {
      navigator('/dashboard');
    }
  }, [error, token, navigator])

  const onChangeEmail = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setEmail(value);

  const onChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setName(value);

  const onChangePassword = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setPassword(value);

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
              </>
            )}
          </form>
        </div>
    </div>
  )
}

export default Register