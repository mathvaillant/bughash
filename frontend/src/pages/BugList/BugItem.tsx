import React from 'react'
import { Launch } from "@mui/icons-material";
import { Avatar, CardActions, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { IBug } from "../../shared/types";
import BugItemMenu from "./BugItemMenu";
import ProfileMe from '../../assets/images/profile.png';
import { useNavigate } from "react-router";

export const BugItem = ({ _id, title, status, createdAt, createdBy, description, files }: IBug): JSX.Element => {
  const navigator = useNavigate();
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
          <Tooltip placement={'bottom'} title={createdBy || ''}>
            <Avatar 
              className={'UserAvatar'} 
              alt={createdBy} 
              src={ProfileMe} 
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