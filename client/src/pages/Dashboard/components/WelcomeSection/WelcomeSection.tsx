import { Box, Card, Typography } from "@mui/material";
import React from 'react'
import { useSelector } from "react-redux";
import { getAuthUserDataName } from "../../../../utils/selectors/auth";

const WelcomeSection: React.FC = (): JSX.Element => {
  const userName = useSelector(getAuthUserDataName);

  return (
    <Box>
        <Card elevation={0} sx={{display: 'flex'}}>
            <Typography variant="h3">Welcome, {userName}!</Typography>
            <Typography variant="subtitle1">Today is a good day to start fixing bugs!</Typography>
        </Card>
    </Box>
  )
}

export default WelcomeSection