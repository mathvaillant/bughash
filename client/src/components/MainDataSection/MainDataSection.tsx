import React from 'react'
import statsServices from "../../utils/services/statsServices";
import Loader from "../Loader/Loader";
import BreakDownByBug from "./components/BreakDownByTimeWorked/BreakDownByTimeWorked";
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
      {breakDownByStatus && breakDownTimeWorked ? (
        <>
          <BreakDownByStatus data={breakDownByStatus} />
          <BreakDownByBug data={breakDownTimeWorked} />
        </>
      ) : (
        <Loader show />
      )}
    </div>
  )
}

export default MainDataSection;