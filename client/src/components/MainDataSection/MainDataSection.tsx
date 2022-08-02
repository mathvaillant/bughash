import React from 'react'
import statsServices from "../../utils/services/statsServices";
import BreakDownByBug from "./components/BreakDownByBug/BreakDownByBug";
import BreakDownByStatus from './components/BreakDownByStatus/BreakDownByStatus'

const MainDataSection = (): JSX.Element => {
  const [breakDownByStatus, setBreakDownByStatus] = React.useState(null); 
  const [breakDownTimeWorked, setBreakDownTimeWorked] = React.useState(null); 

  React.useEffect(() => {
    (async () => {
      const stats = await statsServices.getWeeklyBreakDownStats();
      setBreakDownByStatus(stats.breakDownByStatus);
      setBreakDownTimeWorked(stats.breakDownByTimeWorked);
    })()
  }, []);

  return (
    <div className="MainDataSection">
      <BreakDownByStatus data={breakDownByStatus} />
      <BreakDownByBug data={breakDownTimeWorked} />
    </div>
  )
}

export default MainDataSection;