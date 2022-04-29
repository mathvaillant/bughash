/* eslint-disable max-len */
import { Launch, Save } from "@mui/icons-material";
import { Avatar, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import ProfileMe from '../../assets/images/profile.png';
import React, { useEffect } from 'react'
import './BugList.scss';
import { useDispatch } from "react-redux";
import { clearBugs, getBugs } from "../../actions/bugActions/bugActions";

const BugList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBugs());

    return () => {
      dispatch(clearBugs());
    };
  });

  return (
    <div className={'BugList'}>

        <div className="BugList__cards">
            {/* {MOCK_LIST.map(({ bugDescription, id, title, status }) => {
              const { content } = bugDescription;
              const { time, blocks } = content;

              const date = new Date(time).toLocaleDateString()
              
              return (
                <div key={id} className='BugList__inner__card'>
                  
                  <Tooltip placement='top' title={status}>
                    <span className={`card__status__badge ${status}`}></span>
                  </Tooltip>

                  <CardHeader title={title} subheader={date} />

                  <CardContent>
                    <p>{blocks.at(0)?.data.text}</p>
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
            })} */}
        </div>
    </div>
  )
}

export default BugList