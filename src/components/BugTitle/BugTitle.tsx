import React, { ChangeEvent } from 'react'
import './_BugTitle.scss';

interface Props {
    handleChangeTitle: (title: string) => void
    title: string
}

const BugTitle: React.FC<Props> = ({ handleChangeTitle, title }) => {
    
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => handleChangeTitle(e.target.value);

    return (
        <div className='BugTitle'>
            <input 
                type="text" 
                value={title}
                onChange={onChange}
            />
        </div>
    )
}

export default BugTitle