import React from 'react'
import { BugIdProps } from "../../shared/types";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './_BugId.scss';

const BugId: React.FC<BugIdProps> = ({ id }) => {
  return (
    <div className='BugId'>
        <span><ContentCopyIcon/>{id.slice(0, 10)}</span>
    </div>
  )
}

export default BugId