import React, { useState } from 'react'
import { BugIdProps } from "../../shared/types";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './_BugId.scss';
import { Tooltip } from "@mui/material";

const BugId: React.FC<BugIdProps> = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipBoard = (): void => {
    navigator.clipboard.writeText(id);
    setCopied(true);
  }

  return (
    <div className='BugId'>
        <Tooltip title={`${copied ? 'Copied!' : id}`}>
          <span onClick={handleCopyToClipBoard}><ContentCopyIcon/>{id.slice(0, 10)}</span>
        </Tooltip>
    </div>
  )
}

export default BugId