import React from 'react'
import BreakDownByBug from "./components/BreakDownByBug/BreakDownByBug";
import BreakDownByStatus from './components/BreakDownByStatus/BreakDownByStatus'

const MainDataSection = (): JSX.Element => {
  return (
    <div className="MainDataSection">
      <BreakDownByStatus />
      <BreakDownByBug />
    </div>
  )
}

export default MainDataSection;