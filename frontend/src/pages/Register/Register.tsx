import React, { ChangeEvent, useState } from 'react'
import RegisterImg from '../../assets/images/login.jpeg';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import useToggle from "../../utils/hooks/useToggle";
import './Register.scss';
import { useNavigate } from "react-router";

const Register: React.FC = () => {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useToggle();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onChangeEmail = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setEmail(value);

  const onChangePassword = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setPassword(value);

  const handleRegisterAsGuest = (): void => navigator('/dashboard');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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

            <Button type='submit' variant='contained'>Register</Button>
            <Button type='button' variant='outlined' onClick={handleRegisterAsGuest}>Enter as a guest</Button>
          </form>
        </div>
    </div>
  )
}

export default Register