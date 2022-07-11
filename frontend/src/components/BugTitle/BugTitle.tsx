import React, { ChangeEvent, useEffect } from 'react'
import { useSelector } from "react-redux";
import { IBug } from "../../shared/types";
import useDebounce from "../../utils/hooks/useDebounce";
import BugServices from "../../utils/services/bugServices";
import { getBugTitle } from '../../utils/selectors/bug';

const BugTitle = ({ bugId }: { bugId: string }): JSX.Element => {
    const [title, setTitle] = React.useState<string>('');
    const stateTitle = useSelector(getBugTitle(bugId))

    useEffect(() => {
        if(stateTitle) {
            setTitle(stateTitle);
        }
    }, [stateTitle]);

    const handleSaveTitle = async (): Promise<IBug> => await BugServices.updateBug({ fields: { title }, bugId });
    
    useDebounce(() => handleSaveTitle(), 750, [title]);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value);

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

export default React.memo(BugTitle);