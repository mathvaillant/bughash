import React from 'react';
import './EmptyState.scss';
import data from './data.json';

interface IEmptyState {
    emptyStateFor: 'dashboard' | 'bugList'
}

const EMPTY_STATES_IMG_URL = "https://ittersep.sirv.com/emptystates";

const EmptyState: React.FC<IEmptyState> = ({ emptyStateFor }) => {
    return (
        <div className={`EmptyState ${emptyStateFor}`}>
            <img 
                src={`${EMPTY_STATES_IMG_URL}/${emptyStateFor}.png`} 
            />

            <h1>{data[emptyStateFor].h1}</h1>
        </div>
    )
}

export default EmptyState