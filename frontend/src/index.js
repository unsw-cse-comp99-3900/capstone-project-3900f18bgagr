import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Adjust if your App component is defined elsewhere

ReactDOM.render(
  <React.StrictMode>
    <div style={{border: '0px solid black'}}>
      <App />
    </div> 
  </React.StrictMode>,
  document.getElementById('root')
);

