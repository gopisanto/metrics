import React, { useState } from 'react';
import { AiOutlineGroup } from 'react-icons/ai';

import Individual from './Individual';
import { groupBy } from '../../helper';
import data from '../../data.json';

import './Dashboard.scss';

export interface DataProps {
  id: string;
  label: string;
  value: number;
  type: string;
  description: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [groupMode, setGroupMode] = useState(true);
  const toggleGroupMode = () => setGroupMode(!groupMode);

  return (
    <div className="dashboard">
      <AiOutlineGroup
        size="2em"
        color={`${groupMode ? 'blue' : 'gray'}`}
        onClick={toggleGroupMode}
        className="groupModeIcon"
      />
      {groupMode && (
        <div>
          {groupBy(data.data, ['category', 'type']).map(
            (item: DataProps[], index) => (
              <Individual groupMode key={`${item[0].id}${index}`} data={item} />
            ),
          )}
        </div>
      )}
      {!groupMode && <Individual groupMode={false} data={data.data} />}
    </div>
  );
};

export default Dashboard;
