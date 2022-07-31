import React from 'react'
import Pusher from "pusher-js"
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserDataToken } from "../../selectors/auth";
import { setCurrentUserData } from "../../../actions/authActions/authAction";
import { IUser } from "../../../shared/types";

const useUsersPubSub = (): void => {
  const dispatch = useDispatch();
  const token = useSelector(getAuthUserDataToken);

  const pusherInstance = React.useMemo(() => {
    return new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || '', {
      cluster: 'us3'
    });
  }, []);

  const Users = React.useMemo(() => pusherInstance.subscribe('users'), [pusherInstance]);

  React.useEffect(() => {
    if(Users && token) {
      Users.bind('child_updated', (user: IUser) => dispatch(setCurrentUserData(user)));
    }
  }, [Users, token, dispatch]);
}

export default useUsersPubSub;