// == Import : npm
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// == Composant
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  const handleOnInputChangeSubmit = (e) => {
    setSearchTerm(e.target.value);
    setLoading(true);
    setMessage('');
  };


  return (
    <div id="search">
      <div id="search-container">
        <form>
          <label id="search-label" htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              placeholder="search"
              name="query"
              onChange={handleOnInputChangeSubmit}
              value={searchTerm}
            />
          </label>
        </form>
      </div>
      <ul>
        {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};
// == Export
export default Search;