import React from 'react'
import BugId from "../../components/BugId/BugId";
import BugTitle from "../../components/BugTitle/BugTitle";
import Code from "../../components/Code/Code";
import Description from "../../components/Description/Description"
import Solution from "../../components/Solution/Solution";
import Upload from "../../components/Upload/Upload";
import './_NewBug.scss';

const NewBug: React.FC = () => {
  return (
    <div className='NewBug'>
        <div className='NewBug__header'>
          <BugTitle/>
          <BugId id={'9AHDQW8DQ8F102942'}/>
          <button type='button'>Save</button>
        </div>

        <div className='NewBug__content'>

          <div className='NewBug__content__Desc'>
            <Description />
          </div>
          <div className='NewBug__content__Upload'>
            <Upload /></div>
          <div className='NewBug__content__Code'>
            <Code />
          </div>
          <div className='NewBug__content__Solution'>
            <Solution />
          </div>

        </div>
    </div>
  )
}

export default NewBug