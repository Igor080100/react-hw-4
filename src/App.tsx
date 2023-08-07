import React from 'react';
import { StopWatch } from './components/StopWatch/StopWatch'
import './App.css';

function App() {
  return (
    <div className='container mx-auto max-w-sm mt-5 '>
      < StopWatch time={new Date()} />
      < StopWatch time={new Date()} />
      < StopWatch time={new Date()} />
    </div>
  );
}

export default App;
