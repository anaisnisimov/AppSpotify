// == Import : npm
import React, { useState,useEffect, useReducer } from "react";
import { getToken } from './appMiddleware';
import { reducer } from './appReducer';
import { initialState } from './appReducer';
import Axios from 'axios';
import './search.scss';
const Loader = () => <p>En attente d'une recherche...<img src="./animal.png" id="search-imgloader"></img></p>;

// == Composant
const Search = () => {
  const [state,dispatch]=useReducer(reducer,initialState);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnInputChangeSubmit = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
   
  };

  const handleSearchResult = (e) => {
    e.preventDefault();
    console.log('a result is submitted',e.target);
  }

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
      console.log("ma reponse api track est",res);
      return res;
    }
   

    if(searchTerm !== '') {
      const FetchData =async () => {
        const token =await getToken();
        const data = await getApiData(token);
        
        dispatch({
          type: 'FETCH_DATA',
          payload:data,
        })
      }
      FetchData(); 
      console.log('recherche effectué');

    }else {
      console.log('en attente d\'une recherche');
    }
    
   }, [searchTerm])

  return (
    <div id="search">
      <div id="search-container">
        <h1 id="search-h1">Search musical title from API SPOTIFY</h1>
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
                {state.items.lenght !== 0 && searchTerm !== "" ? 
                  <ul id="search-ul"> 
                    {state.items.map((item,key) => 
                    <li 
                    key ={key}
                    onClick={handleSearchResult}
                    id="search-li"
                    >
                      {item.name} -  
                     {item.artists[0].name} -
                     {item.artists[0].id}  
                     {item.album.release_date} </li>

                    )}
                  </ul> :
                  <Loader />
                  }
          </label>
        </form>
      </div>

      <div id="search-containerResultList">
          <h1 id="search-h1">Ma liste de titre spotify</h1>
         

      </div>    
    </div>  
    
  );
};
// == Export
export default Search;