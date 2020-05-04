import React from "react";
import "./App.css";
import Axios from "axios";
import Search from './Search';

function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message, "le token est :", res.data.body);
  });

  return (
    <div className="App">
    <Search/>
    </div>
  );
}

export default App;