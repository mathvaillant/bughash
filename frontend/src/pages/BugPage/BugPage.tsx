/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo } from 'react';
import { useParams } from "react-router";

import BugTitle from "../../components/BugTitle/BugTitle";
import Description from "../../components/Description/Description"
import Upload from "../../components/Upload/Upload";
import BugId from "../../components/BugId/BugId";

const BugPage: React.FC = () => {
  const { id } = useParams();
  if(!id) return null;

  return (
    <div className='BugPage'>
        <div className='BugPage__header'>
          <div></div>
          <div>
            <BugTitle bugId={id} />
            <BugId id={`${id}`}/>
          </div>
        </div>

        <div className='BugPage__content'>
          <div>
            <Upload bugId={id}/>
          </div>
          <div>
            <Description bugId={id}/>
          </div>
        </div>
    </div>
  )
}

export default memo(BugPage);