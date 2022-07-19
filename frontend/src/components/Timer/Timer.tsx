import { IconButton } from "@mui/material";
import classNames from "classnames";
import React, { useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import useTimeout from "../../utils/hooks/useTimeout";
import { toastr } from "react-redux-toastr";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBugTitle } from "../../utils/selectors/bug";
import BugTitle from "../BugTitle/BugTitle";
import { getAuthUserDataId } from "../../utils/selectors/auth";
import BugServices from "../../utils/services/bugServices";
import { transformToMilliseconds } from "../../utils/utils";

const Timer = (): JSX.Element => {
  const { id }= useParams();
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [timeWorked, setTimeWorked] = React.useState<any[]>([]);
  const [showTask, setShowTask] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [time, setTime] = React.useState({ seconds: '00', minutes: '00', hours: '00'});
  
  const bugTitle = useSelector(getBugTitle(id || ''));
  const userId = useSelector(getAuthUserDataId);

  const handleShowTask = React.useCallback((): void => setShowTask(true), []);
  const handleHideTask = React.useCallback((): void => setShowTask(false), []);

  const handleEndTimer = React.useCallback(async (): Promise<void> => {
    if(userId && id && startedAt) {
      const newTimeWorked = { 
        workers: [userId], 
        timeWorked: transformToMilliseconds(time), 
        startedAt 
      };

      await BugServices.updateBug({
        bugId: id,
        fields: {
          timeWorked: newTimeWorked
        }
      });

      setTimeWorked([
        ...timeWorked,
        newTimeWorked
      ]);
    }
  }, [timeWorked, userId, time, startedAt, id]);

  const handleToggleTimer = React.useCallback((): void => {
    if(!startedAt) {
      toastr.confirm(`Would you like to start working on the bug ${bugTitle}?`, {
        onOk: () => {
          setRunning(true);
          setStartedAt(Date.now());
        },
        cancelText: 'NO',
        okText: 'YES'
      })
      return;
    }
    setRunning(!running);
  }, [running, startedAt, bugTitle]);

  const updateTimer = React.useCallback((): void => {
    const newTime = {...time};
    newTime.seconds = (parseInt(time.seconds) + 1) < 10 ? `0${(parseInt(time.seconds) + 1)}` : (parseInt(time.seconds) + 1).toString();

    if(parseInt(time.seconds) >= 60) {
      newTime.seconds = '00';
      newTime.minutes = (parseInt(time.minutes) + 1) < 10 ? `0${(parseInt(time.minutes) + 1)}` : (parseInt(time.minutes) + 1).toString();
    }

    if(parseInt(time.minutes) >= 60) {
      newTime.minutes = '00';
      newTime.hours = (parseInt(time.hours) + 1) < 10 ? `0${(parseInt(time.hours) + 1)}` : (parseInt(time.hours) + 1).toString();
    }

    setTime(newTime);
  }, [time])

  useTimeout(() => {
    if(running && Number(startedAt) < Date.now()) {
      updateTimer();
    }
  }, [1000]);

  return (
    <div 
      className={classNames('Timer', { allowStart: Boolean(id) })}
      onMouseOver={handleShowTask}
      onMouseLeave={handleHideTask}
    >
        <div className={classNames('Timer__task', { visible: showTask })}>
          <span>{bugTitle}</span>
        </div>

        <form>
            <input type="text" value={time.hours} />
            <span>:</span>
            <input type="text" value={time.minutes} />
            <span>:</span>
            <input type="text" value={time.seconds} />

            <IconButton size="small" onClick={handleToggleTimer}>
              {running ? <PauseIcon fontSize="small"/> : <PlayArrowIcon fontSize="small"/> }
            </IconButton>

            {startedAt && !running && (
              <IconButton size="small" onClick={handleEndTimer}>
                <StopIcon fontSize="small"/>
              </IconButton>
            )}
        </form>
    </div>
  )
}

export default Timer