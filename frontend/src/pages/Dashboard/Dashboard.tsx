import React from 'react';
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState/EmptyState";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const CONTENT = null;

  const handleNewDoc = (): void => navigate('/new');

  return (
    <>
      <div className='Dashboard'>
        {!CONTENT && (
          <EmptyState emptyStateFor="dashboard"/>
        )}
        {/* <Button type='button' className='' onClick={handleNewDoc} data-test={'new-bug'}>
            <AddBox /> New
        </Button> */}
      </div>
    </>
  )
}

export default Dashboard;