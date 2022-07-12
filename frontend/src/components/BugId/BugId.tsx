import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from "@mui/material";

interface Props {
  bugId: string
}

const BugId: React.FC<Props> = ({ bugId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipBoard = (): void => {
    navigator.clipboard.writeText(bugId);
    setCopied(true);
  }

  return (
    <div className='BugId'>
        <Tooltip title={`${copied ? 'Copied!' : bugId}`}>
          <span onClick={handleCopyToClipBoard}><ContentCopyIcon/>{bugId.slice(0, 10)}</span>
        </Tooltip>
    </div>
  )
}

export default BugId