import { IconButton } from "@mui/material";
import classNames from "classnames";
import React, { useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import useTimeout from "../../utils/hooks/useTimeout";
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBugStartedWorkAt, getBugTitle } from "../../utils/selectors/bug";
import { getAuthUserDataId } from "../../utils/selectors/auth";
import BugServices from "../../utils/services/bugServices";
import { transformToFullTime, transformToMilliseconds } from "../../utils/utils";
import { getStateTimer } from "../../utils/selectors/timer";
import { setTimer } from "../../actions/TimerActions";
import { countTimer } from "./utils";

const Timer = (): JSX.Element => {
  const { id: currentPageBugId } = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [showTask, setShowTask] = React.useState(false);
  const [time, setTime] = React.useState({ seconds: '00', minutes: '00', hours: '00'});
  
  const stateTimer = useSelector(getStateTimer);
  const startedWorkAt = useSelector(getBugStartedWorkAt(currentPageBugId || ''));
  const { running, bugId: bugIdRunning, disabled } = stateTimer;
  const bugTitle = useSelector(getBugTitle(bugIdRunning || ''));
  const userId = useSelector(getAuthUserDataId);

  const diffBugFromRunning = (currentPageBugId && bugIdRunning && currentPageBugId !== bugIdRunning);

  const handleShowTask = React.useCallback((): void => setShowTask(true), []);
  const handleHideTask = React.useCallback((): void => setShowTask(false), []);

  const updateTimer = React.useCallback((): void => setTime(countTimer(time)), [time]);

  useTimeout(() => {
    if(running && Number(startedWorkAt) < Date.now()) {
      updateTimer();
    }
  }, [1000]);

  const handlePlayTimer = React.useCallback(async (): Promise<void> => {
    if(!currentPageBugId) return;

    if(!startedWorkAt) {
      await BugServices.updateBug({
        bugId: currentPageBugId,
        fields: {
          startedWorkAt: Date.now(),
        }
      });
    }
    dispatch(setTimer({ bugId: bugIdRunning || currentPageBugId, running: true }));
  }, [currentPageBugId, startedWorkAt, dispatch, bugIdRunning]);

  const handleEndTimer = React.useCallback(async () => {
    if(!(currentPageBugId && bugIdRunning)) return;

    await BugServices.updateBug({
      bugId: currentPageBugId,
      fields: {
        timeWorked: {
          workers: [userId],
          timeWorked: transformToMilliseconds(time)
        },
      }
    });

    dispatch(setTimer({reset: true}));
    setTime({ seconds: '00', minutes: '00', hours: '00'});
  }, [bugIdRunning, currentPageBugId, dispatch, time, userId])

  const handlePauseTimer = React.useCallback(() => {
    dispatch(setTimer({...stateTimer, running: false}));
  }, [dispatch, stateTimer])

  const handleRedirectToBug  = React.useCallback(() => navigator(`edit/${bugIdRunning}`), [bugIdRunning, navigator])

  useEffect(() => {
    if(startedWorkAt && !diffBugFromRunning) {
      const timerSinceLastStart = (Date.now() - startedWorkAt);
      setTime(transformToFullTime(timerSinceLastStart));
      dispatch(setTimer({...stateTimer, running: true }));
    }
  }, [startedWorkAt, diffBugFromRunning, dispatch]);

  useEffect(() => {
    if(currentPageBugId && disabled) {
      dispatch(setTimer({...stateTimer, disabled: false }));
    }
    
    if (!currentPageBugId && !disabled) {
      dispatch(setTimer({...stateTimer, disabled: true }));
    }

    if(!currentPageBugId && !running) {
      setTime({ seconds: '00', minutes: '00', hours: '00'});
    }
  }, [bugIdRunning, currentPageBugId, disabled, dispatch, running, stateTimer]);

  return (
    <div 
      className={classNames('Timer', { disabled: disabled })}
      onMouseOver={handleShowTask}
      onMouseLeave={handleHideTask}
    >
        {(bugTitle) && (
          <div className={classNames('Timer__task', { visible: showTask })}>
            <span>{bugTitle}</span>
            <IconButton size="small" onClick={handleRedirectToBug}>
              <LaunchIcon fontSize="small" color="secondary"/>
            </IconButton>
          </div>
        )}

        <form>
            <input type="text" value={time.hours} />
            <span>:</span>
            <input type="text" value={time.minutes} />
            <span>:</span>
            <input type="text" value={time.seconds} />
          
            {currentPageBugId && startedWorkAt && bugIdRunning && !running && (
              <IconButton size="small" onClick={handleEndTimer}>
                <StopIcon fontSize="small"/>
              </IconButton>
            )}

            {running ? (
              <IconButton size="small" onClick={handlePauseTimer}>
                <PauseIcon fontSize="small"/>
              </IconButton>
            ): (
              <IconButton size="small" onClick={handlePlayTimer}>
                <PlayArrowIcon fontSize="small"/>
              </IconButton>
            )}

        </form>
    </div>
  )
}

export default React.memo(Timer)