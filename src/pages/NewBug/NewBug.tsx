import { Button } from "@mui/material";
import React from 'react'
import { useParams } from "react-router";
import BugId from "../../components/BugId/BugId";
import BugTitle from "../../components/BugTitle/BugTitle";
import Description from "../../components/Description/Description"
import SideMenu from "../../components/SideMenu/SideMenu";
import Upload from "../../components/Upload/Upload";
import './_NewBug.scss';

const NewBug: React.FC = () => {
  const params = useParams();

  return (
    <>
      <div className='NewBug'>
          <div className='NewBug__header'>
            <BugTitle/>
              <BugId id={`${params.id}`}/>
            <Button variant='contained' type='button' className='saveButton'>Save</Button>
          </div>

          <div className='NewBug__content'>
            <div>
              <Upload bugId={params.id}/>
            </div>
            <div>
              <Description bugId={params.id} />
            </div>
          </div>
      </div>
    </>
  )
}

export default NewBug