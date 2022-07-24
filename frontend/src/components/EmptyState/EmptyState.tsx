import React from 'react';
import data from './data.json';

interface IEmptyState {
    emptyStateFor: 'dashboard' | 'bugList',
    customLabel?: string | null
}

const EMPTY_STATES_IMG_URL = "https://ittersep.sirv.com/emptystates";

const EmptyState: React.FC<IEmptyState> = ({ emptyStateFor, customLabel = null }) => {
    return (
        <div className={`EmptyState ${emptyStateFor}`}>
            <img 
                src={`${EMPTY_STATES_IMG_URL}/${emptyStateFor}.png`} 
            />

            {customLabel ? (
                <h1>{customLabel}</h1>
            ) : (
                <h1>{data[emptyStateFor].h1}</h1>
            )}

        </div>
    )
}

export default EmptyState