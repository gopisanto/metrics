import React from 'react';
import classnames from 'classnames';

import './Col.scss';
import { typifyVal, UNITS } from '../../helper';

interface Props {
  value: string | number;
  numCols: number;
  type: string;
  center: boolean;
  head?: boolean;
}

// Gives meaningful value. we can use switch in case of we have many types of representing data
// in this case i have only consdiered percentage, hence no switch statement.
export const getProperValue = (
  value: string | number,
  type: string,
): string | number => {
  if (type === UNITS.percentage) {
    return `${typifyVal(type, Number(value))}%`;
  } else if ([UNITS.hours, UNITS.secs].includes(type)) {
    return `${typifyVal(type, Number(value))} secs`;
  }

  return value;
};

const Col: React.FC<Props> = ({ value, numCols, type, center, head }) => {
  return (
    <div
      className={classnames('col', `col-${numCols}`, {
        alignCenter: center,
        head,
      })}
    >
      {getProperValue(value, type)}
    </div>
  );
};

export default Col;
