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


  // useEffect(() => {
  //   Axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   })
  //     .then((response) => {
  //       // const { token } = response.data;
  //       const dataSound = response.data;
  //       this.setState({ dataSound });
  //       console.log('oh yeah', response.data);
  //     })
  //     .catch((response) => {
  //       console.log('hé nope!', response);
  //     });
  // }, [searchTerm]);


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