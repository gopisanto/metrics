import React from 'react';
import classnames from 'classnames';

import './Col.scss';

interface Props {
  value: string | number;
  numCols: number;
  isPercentage: boolean;
  center: boolean;
  head?: boolean;
}

// Gives meaningful value. we can use switch in case of we have many types of representing data
// in this case i have only consdiered percentage, hence no switch statement.
const getProperValue = (
  value: string | number,
  isPercentage: boolean,
): string | number =>
  isPercentage ? `${parseFloat(value.toString()) * 100}%` : value;

const Col: React.FC<Props> = ({
  value,
  numCols,
  isPercentage,
  center,
  head,
}) => {
  return (
    <div
      className={classnames('col', `col-${numCols}`, {
        alignCenter: center,
        head,
      })}
    >
      {getProperValue(value, isPercentage)}
    </div>
  );
};

export default Col;
