import React from 'react'
import { Launch } from "@mui/icons-material";
import { Avatar, CardActions, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { IBug } from "../../shared/types";
import BugItemMenu from "./BugItemMenu";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getAuthUserDataAvatarUrl, getAuthUserDataName } from "../../utils/selectors/auth";

export const BugItem = ({ _id, title, status, createdAt, createdBy, description, files }: IBug): JSX.Element => {
  const navigator = useNavigate();
  const userAvatar = useSelector(getAuthUserDataAvatarUrl);
  const userName  = useSelector(getAuthUserDataName);
  const blocks = description?.blocks;

  const handleEditBug = (): void => navigator(`/edit/${_id}`);

  return (
    <div key={_id} className='BugList__inner__card'>
      
      <Tooltip placement='top' title={status}>
        <span className={`card__status__badge ${status}`}></span>
      </Tooltip>

      <CardHeader 
        title={title} 
        subheader={createdAt} 
        action={
         <BugItemMenu _id={_id} title={title}/>
        }
      />

      <CardContent>
        <p>{blocks?.at(0)?.data.text}</p>
      </CardContent>

      <CardActions>
        <IconButton>
          <Tooltip placement={'bottom'} title={userName || ''}>
            <Avatar 
              className={'UserAvatar'} 
              alt={createdBy} 
              src={userAvatar} 
              sx={{ width: 25, height: 25 }}
            />
          </Tooltip>
        </IconButton>
        <IconButton onClick={handleEditBug}>
          <Launch fontSize={'small'}/>
        </IconButton>
      </CardActions>
    </div>
  )
};

export default BugItem