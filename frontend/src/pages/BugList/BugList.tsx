import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { getBugsList } from "../../actions/bugActions/bugActions";
import { getAuthUserDataToken } from "../../utils/selectors/auth";
import { getBugList } from "../../utils/selectors/bug";
import BugItem from "./BugItem";
import './BugList.scss';

const BugList: React.FC = () => {
  const dispatch = useDispatch();

  const bugList = useSelector(getBugList);
  const token = useSelector(getAuthUserDataToken);

  useEffect(() => {
    if(token && (!bugList || _.isEmpty(bugList))) {
      dispatch(getBugsList(token));
    }
  }, []);

  return (
    <div className={'BugList'}>

        <div className="BugList__cards">
            {
              bugList && bugList.map(({ description, _id, title, status, createdAt, files, createdBy }, index) => {
                return <BugItem 
                  key={`${_id}-${index}`} 
                  title={title} 
                  status={status} 
                  createdAt={createdAt}
                  _id={_id}
                  description={description}
                  files={files}
                  createdBy={createdBy}
                />
              })
            }
        </div>
    </div>
  )
}

export default BugList;