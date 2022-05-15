import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from "@mui/material";

interface Props {
  id: string
}

const BugId: React.FC<Props> = ({ id }) => {
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