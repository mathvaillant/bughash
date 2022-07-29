import React from 'react'
import Pusher from "pusher-js"
import { useDispatch, useSelector } from "react-redux";
import { getBugsList } from "../../../actions/bugActions/bugActions";
import { getAuthUserDataToken } from "../../selectors/auth";

const useBugsPubSub = (): void => {
  const dispatch = useDispatch();
  const token = useSelector(getAuthUserDataToken);

  const pusherInstance = React.useMemo(() => {
    return new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || '', {
      cluster: 'us3'
    });
  }, []);

  const Bugs = React.useMemo(() => pusherInstance.subscribe('bugs'), [pusherInstance]);

  React.useEffect(() => {
    if(Bugs && token) {
      Bugs.bind('child_added', () => dispatch(getBugsList(token)));
      Bugs.bind('child_updated', () => dispatch(getBugsList(token)));
      Bugs.bind('child_deleted', () => dispatch(getBugsList(token)));
    }
  }, [Bugs, token, dispatch]);
}

export default useBugsPubSub;