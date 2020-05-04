// == Import : npm
import React, { useState,useEffect, useReducer } from "react";
import { getToken } from './appMiddleware';
import { getApiData } from './appMiddleware';
import { reducer } from './appReducer';
import { initialState } from './appReducer';
import Axios from 'axios';
const Loader = () => <p>Data incoming</p>;

// == Composant
const Search = () => {
  const [state,dispatch]=useReducer(reducer,initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleOnInputChangeSubmit = (e) => {
    setSearchTerm(e.target.value);
   
  };

// appel api via appMiddleware et appReducer
  useEffect(() => {
  const getApiData = async token => {
      const res = Axios.get(`https://api.spotify.com/v1/search?&type=track`, {
        params: {
          q:`${searchTerm}`
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res);
      return res;
    }

    if(searchTerm !== '') {
      const FetchData =async () => {
        const token =await getToken();
        const data = await getApiData(token);
        dispatch({
          type: 'FETCH_DATA',
          payload:data
        })
      }
      FetchData(); 
    }else {
      console.log('en attente d\'une recherche');
    }
   }, [searchTerm])

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
        <div>
        {state.items.lenght !== 0 && searchTerm !== "" ? 
          <ul> 
            {state.items.map((item,key) => <li key={key}>{item.name}</li>)}
          </ul> :
          <Loader />
          }
        </div>
      </div>  
    </div>
  );
};
// == Export
export default Search;