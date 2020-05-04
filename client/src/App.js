import React from "react";
import './App.css';
import Search from './Search';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Search musical title from API SPOTIFY</h1>
      </header>
    <Search />
    </div>
  );
}

export default App;