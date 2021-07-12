import React, { useCallback, useState } from 'react';

import Dashboard from './components/dashboard/Dashboard';

import data from './data.json';
import './App.scss';
import Chart from './components/charts/Chart';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Metrics</h2>
      </header>
      <Dashboard />
      <Chart />
    </div>
  );
};

export default App;
