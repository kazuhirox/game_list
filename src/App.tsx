import React from 'react';
import Button from 'react-bootstrap/Button';
// import logo from './logo.svg';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header> */}
    <div className="card">
      <div className="card-body">
        <Button variant="outline-primary">プライマリーボタン</Button>
      </div>
    </div>
  </div>
);

export default App;
