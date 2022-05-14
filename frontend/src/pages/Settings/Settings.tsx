import React from 'react'
import './Settings.scss';

const Settings: React.FC = () => {
  return (
    <div className="Settings">

        <div className="Settings__left">
            <h1>Settings</h1>

            <div className="Settings__left__div Profile">
                <h2>Profile</h2>
            </div>

            <div className="Settings__left__div Workspace">
                <h2>Workspace</h2>
            </div>
        </div>

        <div className="Settings__right">
          
        </div>

    </div>
  )
}

export default Settings