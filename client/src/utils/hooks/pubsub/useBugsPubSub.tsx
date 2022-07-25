import React from 'react'
import Pusher from "pusher-js"
import { useDispatch } from "react-redux";
import { IBug } from "../../../shared/types";
import { updateBugsListState } from "../../../actions/bugActions/bugActions";
import _ from "underscore";

const useBugsPubSub = (): void => {
  const dispatch = useDispatch();

  const pusherInstance = React.useMemo(() => {
    return new Pusher('674b641b12ad7499b603', {
      cluster: 'us3'
    });
  }, []);

  const Bugs = React.useMemo(() => pusherInstance.subscribe('bugs'), [pusherInstance]);
  
  const handleUpdateBugs = React.useCallback((bugs: IBug[]): void => {
    const bugsArr = _.flatten(Object.values(bugs));
    dispatch(updateBugsListState(bugsArr));
  }, []);

  React.useEffect(() => {
    Bugs.bind('child_added', (bugs: IBug[]) => handleUpdateBugs(bugs));
    Bugs.bind('child_updated', (bugs: IBug[]) => handleUpdateBugs(bugs));
    Bugs.bind('child_deleted', (bugs: IBug[]) => handleUpdateBugs(bugs));
  }, [Bugs, handleUpdateBugs]);
}

export default useBugsPubSub;