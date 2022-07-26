import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import classNames from "classnames";
import React, { useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import useTimeout from "../../utils/hooks/useTimeout";
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ITimeWorked } from "../../shared/types";
import { getBugTimeWorked } from "../../utils/selectors/bug";
import BugServices from "../../utils/services/bugServices";
import { getAuthUserDataAvatar, getAuthUserDataId } from "../../utils/selectors/auth";
import { transformToFullTime } from "../../utils/utils";
import { toastr } from "react-redux-toastr";
import { getStartedAtFormatted } from "./utils";

const Timer = (): JSX.Element => {
  const { id: bugId } = useParams();

  const [show, setShow] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);
  const [currentTimerWork, setCurrentTimerWork] = React.useState<ITimeWorked | null>(null);
  const [allTimeWorked, setAllTimeWorked] = React.useState<ITimeWorked[]>([]);
  const [timeElapsed, setTimeElapsed] = React.useState({ seconds: '00', minutes: '00', hours: '00'});
  const [timerRunning, setTimerRunning] = React.useState(false);

  const userId = useSelector(getAuthUserDataId);
  const stateTimeWorked = useSelector(getBugTimeWorked(bugId));
  const userAvatar = useSelector(getAuthUserDataAvatar);
  
  const handleShowAll = React.useCallback(() => setTimeout(() => setShowAll(true), 200), []);
  const handleHideAll = React.useCallback(() => setTimeout(() => setShowAll(false), 200), []);
  const resetTimer = React.useCallback(() => setTimeElapsed({ seconds: '00', minutes: '00', hours: '00'}), [])

  const handleStart = React.useCallback(async (): Promise<void> => {
    if(!bugId || !userId) return;
  
    setTimerRunning(true);
    const newTimeWorked: ITimeWorked = { startedAt: Date.now(), workers: [userId]};
    await BugServices.updateBug({
      bugId,
      fields: { timeWorked: newTimeWorked }
    });

    setCurrentTimerWork(newTimeWorked);
  }, [bugId, userId]);

  const handleStop = React.useCallback(async (): Promise<void> => {
    if(!bugId || !userId || !currentTimerWork) return;

    setTimerRunning(false);

    toastr.confirm('Are you sure you want to stop working?! This Scheiße still does not works 😒', {
      onOk: async () => {
        const finishedTimeWorked: ITimeWorked = {
          ...currentTimerWork,
          timeWorked: Date.now() - currentTimerWork.startedAt,
          endedAt: Date.now()
        };
        
        await BugServices.updateBug({
          bugId,
          fields: { timeWorked: finishedTimeWorked }
        })

        resetTimer(); 
      },
      onCancel: () => {
        setTimerRunning(true);
      },
      okText: 'OH YES',
      cancelText: 'CANCEL'
    });
  }, [bugId, currentTimerWork, userId, resetTimer]);

  useTimeout(() => {
    const lastTimer = allTimeWorked.find(el => !el.endedAt);
    if(timerRunning && lastTimer && lastTimer?.startedAt - Date.now()) {
      const newTimeElapsed = Date.now() - lastTimer?.startedAt;
      setTimeElapsed(transformToFullTime(newTimeElapsed));
    }
  }, [1000]);

  useEffect(() => {
    if(stateTimeWorked) {
      const currentRunning = stateTimeWorked.find(el => !el.endedAt) || null;
      setAllTimeWorked(stateTimeWorked);

      if(currentRunning) {
        setCurrentTimerWork(currentRunning);
        setTimerRunning(true);
      }
    }
  }, [stateTimeWorked]);

  useEffect(() => {
    if(bugId) {
      setImmediate(() => setShow(true));
    }
  }, [bugId]);

  return (
    <div 
      className={classNames('Timer', { show })}
      onMouseOver={handleShowAll}
      onMouseLeave={handleHideAll}
    >
       {allTimeWorked.length > 0 && allTimeWorked.find(el => el.endedAt) && (
         <div className={classNames('Timer__timeWorked', { visible: showAll })}>
          {allTimeWorked.map(({ startedAt, endedAt, timeWorked, workers }, index) => {
            return (
              <div key={startedAt + index} className='Timer__timeWorked__item'>
                {/* <AvatarGroup max={3}> TODO: for now there's only 1 user per timeWorked (current user) */}
                  {workers.map(workerId => {
                    return <Avatar 
                      key={workerId} 
                      src={userAvatar?.url} 
                      sx={{ width: 25, height: 25, marginRight: '10px'}}
                    /> 
                  })}
                {/* </AvatarGroup> */}
                <small>{getStartedAtFormatted(startedAt, endedAt || null, timeWorked || null)}</small>
              </div>
            )
          })}
        </div>
      )}

        <form>
            <input readOnly type="text" value={timeElapsed.hours} />
            <span>:</span>
            <input readOnly type="text" value={timeElapsed.minutes} />
            <span>:</span>
            <input readOnly type="text" value={timeElapsed.seconds} />

            {timerRunning ? (
              <IconButton size="small" onClick={handleStop}>
                <StopIcon fontSize="small"/>
              </IconButton>
            ): (
              <IconButton size="small" onClick={handleStart}>
                <PlayArrowIcon fontSize="small"/>
              </IconButton>
            )}

        </form>
    </div>
  )
}

export default React.memo(Timer)