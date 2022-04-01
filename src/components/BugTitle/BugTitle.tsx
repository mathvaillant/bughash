import React, { useState } from 'react'
import './_BugTitle.scss';

const BugTitle: React.FC = () => {
    const [title, setTitle] = useState('New Bug');

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setTitle(value);
    };

    return (
        <div className='BugTitle'>
            <input 
                type="text" 
                value={title}
                onChange={handleChangeTitle}
            />
        </div>
    )
}

export default BugTitle