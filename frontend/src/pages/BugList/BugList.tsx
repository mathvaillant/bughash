import React from 'react'
import { useSelector } from "react-redux";
import _ from "underscore";
import EmptyState from "../../components/EmptyState/EmptyState";
import { getBugList } from "../../utils/selectors/bug";
import BugItem from "./BugItem";

const BugList: React.FC = () => {
  const bugList = useSelector(getBugList);

  if(_.isEmpty(bugList)) {
    return (
      <div className={'BugList empty'}>
        <EmptyState emptyStateFor="bugList"/>
      </div>      
    ) 
  }

  return (
    <div className={'BugList'}>
        {bugList && (
          <div className="BugList__cards">
            {
              bugList.map(({ description, _id, title, status, createdAt, files, createdBy }, index) => {
                return <BugItem 
                  key={`${_id}-${index}`} 
                  title={title} 
                  status={status} 
                  createdAt={createdAt}
                  bugId={_id}
                  description={description}
                  files={files}
                  createdBy={createdBy}
                />
              })
            }
        </div>
        )}
    </div>
  )
}

export default BugList;