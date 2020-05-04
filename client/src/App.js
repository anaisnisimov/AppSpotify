import React from "react";
import "./App.css";
import axios from "axios";
import Search from './Search';

function App() {
  axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message,"le token est:", res.data.body);
  });

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