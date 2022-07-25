import React from 'react'

interface LoaderProps {
  show: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show = false }) => {
  if(!show) {
    return <div/>;
  }

  return (
    <div className='Loader__container'>
      <div className="Loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Loader