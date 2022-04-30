/* eslint-disable max-len */
import React, { useEffect } from 'react'
import { Launch, Save } from "@mui/icons-material";
import { Avatar, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import ProfileMe from '../../assets/images/profile.png';
import { useSelector } from "react-redux";
import { getBugList } from "../../utils/selectors/bug";
import './BugList.scss';

const BugList: React.FC = () => {
  const bugList = useSelector(getBugList);

  useEffect(() => {
    // get the bug list from here
  }, []);

  return (
    <div className={'BugList'}>

        <div className="BugList__cards">
            {
              bugList && bugList.map(({ description, _id, title, status, createdAt }) => {
                const blocks = description?.content?.blocks;
                
                return (
                  <div key={_id} className='BugList__inner__card'>
                    
                    <Tooltip placement='top' title={status}>
                      <span className={`card__status__badge ${status}`}></span>
                    </Tooltip>

                    <CardHeader title={title} subheader={createdAt} />

                    <CardContent>
                      <p>{blocks?.at(0)?.data.text}</p>
                    </CardContent>

                    <CardActions>
                      <IconButton>
                        <Tooltip placement={'bottom'} title={'Profile'}>
                          <Avatar className={'UserAvatar'} alt="Matheus Vaillant" src={ProfileMe} sx={{ width: 30, height: 30 }}/>
                        </Tooltip>
                      </IconButton>
                      <IconButton>
                        <Save/>
                      </IconButton>
                      <IconButton>
                        <Launch/>
                      </IconButton>
                    </CardActions>
                  </div>
                )
              })
            }
        </div>
    </div>
  )
}

export default BugList