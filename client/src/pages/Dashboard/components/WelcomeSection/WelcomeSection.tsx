import { Avatar, Typography } from "@mui/material";
import React from 'react'
import { useSelector } from "react-redux";
import { getAuthUserDataAvatar, getAuthUserDataName } from "../../../../utils/selectors/auth";

const WelcomeSection: React.FC = (): JSX.Element => {
  const userName = useSelector(getAuthUserDataName);
  const userAvatar = useSelector(getAuthUserDataAvatar);

  return (
    <div className="WelcomeSection">
      <Avatar 
        variant="square" 
        src={userAvatar?.url} 
        sx={{ 
          width: 70, 
          height: 70,
          boxShadow: '0px 0px 20px 6px rgba(0, 0, 0, 0.06)',
          padding: .5,
        }}
      />
      <div className="WelcomeSection__text">
        <Typography variant="h5">Welcome, {userName}!</Typography>
        <Typography variant="subtitle1">Today is a good day to get rid of bugs!</Typography>
      </div>
    </div>
  )
}

export default WelcomeSection