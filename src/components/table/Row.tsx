import React from 'react';

import './Row.scss';

interface Props {
  level: string;
  selected: boolean;
  id: string;
  onClickHandler: (id: string) => void;
}

const Row: React.FC<Props> = ({
  children,
  level,
  selected,
  id,
  onClickHandler,
}) => {
  return (
    <div
      className={`row ${level} ${selected && `${level}-selected`}`}
      onClick={() => onClickHandler(id)}
    >
      {children}
    </div>
  );
};

export default Row;
