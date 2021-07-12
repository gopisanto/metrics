import React, { useDebugValue } from 'react';

import './Col.scss';

interface Props {
  value: string | number;
  numCols: number;
  isPercentage: boolean;
  center: boolean;
}

// Gives meaningful value. we can use switch in case of we have many types of representing data
// in this case i have only consdiered percentage, hence no switch statement.
const getProperValue = (
  value: string | number,
  isPercentage: boolean,
): string | number =>
  isPercentage ? `${parseFloat(value.toString()) * 100}%` : value;

const Col: React.FC<Props> = ({ value, numCols, isPercentage, center }) => {
  return (
    <div className={`col col-${numCols} ${center && 'alignCenter'}`}>
      {getProperValue(value, isPercentage)}
    </div>
  );
};

export default Col;