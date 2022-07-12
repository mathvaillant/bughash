/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo } from 'react';
import { useParams } from "react-router";

import BugTitle from "../../components/BugTitle/BugTitle";
import Description from "../../components/Description/Description"
import Upload from "../../components/Upload/Upload";
import BugId from "../../components/BugId/BugId";
import BugStatus from "../../components/BugStatus/BugStatus";

const BugPage: React.FC = () => {
  const { id } = useParams();
  if(!id) return null;

  return (
    <div className='BugPage'>
        <div className='BugPage__header'>
          <div>
            <BugTitle bugId={id} />
            <BugStatus bugId={id} />
            <BugId bugId={id} />
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