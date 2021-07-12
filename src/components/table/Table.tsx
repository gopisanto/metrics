import React from 'react';

import './Table.scss';

const Table: React.FC = ({ children }) => {
  return <div className="table">{children}</div>;
};

export default Table;
