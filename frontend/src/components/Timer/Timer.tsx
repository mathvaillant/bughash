import { IconButton } from "@mui/material";
import classNames from "classnames";
import React, { useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import useTimeout from "../../utils/hooks/useTimeout";

const Timer = (): JSX.Element => {
  const [startOn, setStartOn] = React.useState<number | null>(null);
  const [showTask, setShowTask] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [time, setTime] = React.useState({ seconds: '00', minutes: '00', hours: '00'});

  const handleShowTask = React.useCallback((): void => setShowTask(true), []);
  const handleHideTask = React.useCallback((): void => setShowTask(false), []);

  const handleToggleTimer = React.useCallback((): void => {
    if(!startOn) {
      setStartOn(Date.now());
    }
    setRunning(!running);
  }, [running, startOn]);

  const updateTimer = React.useCallback((): void => {
    const newTime = {...time};

    if(parseInt(time.seconds) === 60) {
      newTime.seconds = '00';
      newTime.minutes = (parseInt(time.minutes) + 1).toFixed(2).toString(); 
    }

    if(parseInt(time.minutes) === 60) {
      newTime.minutes = '00';
      newTime.hours = (parseInt(time.hours) + 1).toFixed(2).toString();
    }

    setTime(newTime);
  }, [time])

  useTimeout(() => {
    if(running && Number(startOn) < Date.now()) {
      updateTimer();
    }
  }, 1000);

  return (
    <div 
      className="Timer" 
      onMouseOver={handleShowTask}
      onMouseLeave={handleHideTask}
    >
        <div className={classNames('Timer__task', { visible: showTask })}>
          <span>Bug Sample 1</span>
        </div>

        <form>
            <input type="text" defaultValue={time.hours} />
            <span>:</span>
            <input type="text" defaultValue={time.minutes} />
            <span>:</span>
            <input type="text" defaultValue={time.seconds} />

            <IconButton size="small" onClick={handleToggleTimer}>
              {running ? <StopIcon fontSize="small"/> : <PlayArrowIcon fontSize="small"/> }
            </IconButton>
        </form>
    </div>
  )
}

export default Timer