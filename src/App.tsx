import React from 'react';

import Dashboard from './components/dashboard/Dashboard';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Metrics</h2>
      </header>
      <Dashboard />
    </div>
  );
};

export default App;
