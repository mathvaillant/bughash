import { IconButton } from "@mui/material";
import classNames from "classnames";
import React, { useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import useTimeout from "../../utils/hooks/useTimeout";
import { toastr } from "react-redux-toastr";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBugTimeWorked, getBugTitle } from "../../utils/selectors/bug";
import { getAuthUserDataId } from "../../utils/selectors/auth";
import BugServices from "../../utils/services/bugServices";
import { transformToMilliseconds } from "../../utils/utils";
import { getStateTimer } from "../../utils/selectors/timer";
import { setTimer } from "../../actions/TimerActions";
import { countTimer } from "./utils";
import { ITimeWorked } from "../../shared/types";

const Timer = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [timeWorked, setTimeWorked] = React.useState<ITimeWorked[]>([]);
  const [showTask, setShowTask] = React.useState(false);
  const [time, setTime] = React.useState({ seconds: '00', minutes: '00', hours: '00'});
  
  const stateTimer = useSelector(getStateTimer);
  const { running, bugId } = stateTimer;

  const bugTitle = useSelector(getBugTitle(bugId || id || ''));
  const userId = useSelector(getAuthUserDataId);
  const stateTimeWorked = useSelector(getBugTimeWorked(bugId || id)); 

  const handleShowTask = React.useCallback((): void => setShowTask(true), []);
  const handleHideTask = React.useCallback((): void => setShowTask(false), []);

  const handleSaveTimeWorked = React.useCallback(async (): Promise<void> => {
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
  }, [userId, id, time, startedAt, timeWorked]);

  const handleEndTimer = React.useCallback(async (): Promise<void> => {
    try {
        toastr.confirm(`Are you sure to stop working on the bug ${bugTitle}?`, {
          onOk: async () => {
            await handleSaveTimeWorked();
            dispatch(setTimer({reset: true}));
          },
          cancelText: 'NO',
          okText: 'YES'
        })
    } catch (error) {
      console.log("🚀 ~ file: Timer.tsx ~ line 61 ~ handleEndTimer ~ error", error);
    }
  }, [bugTitle, handleSaveTimeWorked, dispatch]);

  const handleToggleTimer = React.useCallback((): void => {
    if(!startedAt) {
      toastr.confirm(`Would you like to start working on the bug ${bugTitle}?`, {
        onOk: () => {
          if(id) {
            dispatch(setTimer({ bugId: id, running: true, disabled: false }));
            setStartedAt(Date.now());
          }
        },
        cancelText: 'NO',
        okText: 'YES'
      })
      return;
    } 

    dispatch(setTimer({ ...stateTimer, running: !running }));
  }, [running, stateTimer, startedAt, bugTitle, id, dispatch]);

  const updateTimer = React.useCallback((): void => setTime(countTimer(time)), [time]);

  useTimeout(() => {
    if(running && Number(startedAt) < Date.now()) {
      updateTimer();
    }
  }, [1000]);

  useEffect(() => {
    if(stateTimeWorked.length && (id || bugId)) {
      console.log("🚀 ~ file: Timer.tsx ~ line 104 ~ useEffect ~ stateTimeWorked", stateTimeWorked);
      setTimeWorked(stateTimeWorked);
    }
  }, [stateTimeWorked, id, bugId]);

  return (
    <div 
      className={classNames('Timer', { allowStart: Boolean(id), disabled: !id && !bugId })}
      onMouseOver={handleShowTask}
      onMouseLeave={handleHideTask}
    >
        {(bugTitle) && (
          <div className={classNames('Timer__task', { visible: showTask })}>
            <span>{bugTitle}</span>
          </div>
        )}

        <form>
            <input type="text" value={time.hours} />
            <span>:</span>
            <input type="text" value={time.minutes} />
            <span>:</span>
            <input type="text" value={time.seconds} />

            {startedAt && !running && (
              <IconButton size="small" onClick={handleEndTimer}>
                <StopIcon fontSize="small"/>
              </IconButton>
            )}

            <IconButton size="small" onClick={handleToggleTimer}>
              {running ? <PauseIcon fontSize="small"/> : <PlayArrowIcon fontSize="small"/> }
            </IconButton>

        </form>
    </div>
  )
}

export default Timer