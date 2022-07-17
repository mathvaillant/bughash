import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserDataToken } from "../../utils/selectors/auth";
import { hideLoader, showLoader } from "../../actions/loaderActions/loaderActions";
import { toastr } from "react-redux-toastr";
import { getBugsList } from "../../actions/bugActions/bugActions";
import BugServices from "../../utils/services/bugServices";

import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { getBugFiles } from "../../utils/selectors/bug";

interface BugItemProps {
  bugId: string | undefined
  title : string | null
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      }
    },
  },
}));

const BugItemMenu: React.FC<BugItemProps> = ({ bugId, title }): JSX.Element => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const token = useSelector(getAuthUserDataToken);
  const bugFiles = useSelector(getBugFiles(bugId || ''))

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleEditBug = (): void => navigator(`/edit/${bugId}`);

  const handleDelete = (): void => {
    toastr.confirm(`Are you sure to delete ${title}? This action cannot be reverted!`, {
      onOk: async () => {
        try {
          dispatch(showLoader());

          if(!bugId || !token) {
            throw new Error('You do not have permissions to perform this action!');
          }

          const fileRefs = bugFiles.map(file => file.ref);
          await BugServices.deleteBug(bugId, fileRefs, token);

          toastr.success('Done', '');
          dispatch(getBugsList(token));

        } catch (error: any) {
          toastr.error('You do not have permissions to perform this action!', 'Please check if you are the original creator of this bug.');
        } finally {
          dispatch(hideLoader());
        }
      },
    });
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
      >
        <MoreVert fontSize={'small'}/>
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditBug} disableRipple>
          <EditIcon fontSize={'small'} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon fontSize={'small'} />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon fontSize={'small'} />
          Archive
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon fontSize={'small'} />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default BugItemMenu;