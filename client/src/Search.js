// == Import : npm
import React, { useState, useReducer } from "react";
import { getToken } from './appMiddleware';
import { reducer } from './appReducer';
import { initialState } from './appReducer';
// import {styleFilter}  from './styleFilter';
import {styleDatas}  from './styleDatas';


import Axios from 'axios';
import './search.scss';

const Search = () => {
  const [state,dispatch]=useReducer(reducer,initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading,setLoading] = useState(false);
  

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading({ loading: true });
   
    const getApiData = async token => {
     
      const res = await Axios.get(`https://api.spotify.com/v1/search?&type=track,artist`, {
        params: {
          q:`${searchTerm}`
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const id = idArtistFilter();
      console.log("dans mon premier apel api, mon id artist est", id);
      console.log("ma reponse api track est",res, "et un de mes id est ",res.data.tracks.items[0].id);
      return res;
    }

    

    // const getApiArtist = async (token,id) => {
    //   console.log("dans mon second appel api l'id est",id);
    //   const resArtist = await Axios.get(`https://api.spotify.com/v1/search?&type=artist`, {
    //     params: {
    //       id:id,
    //     },
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
          
          
    //     },
    //   })
    //   console.log("ma reponse api artist est",resArtist);
    //   return resArtist;
    // }

      if(searchTerm !== 0) {
        setTimeout(() => {
            const FetchData = async () => {
              const token = await getToken();
              const data = await getApiData(token);
              const id=  idArtistFilter();
              console.log("dans mon fetchData id est", id);
              // const dataIdArtist = await getApiArtist(token, id);

              dispatch({
                type: 'FETCH_DATA',
                payload:data,
              })
              
            }

            FetchData();
            setLoading(false);
          }, 1000);

          }else {
            console.log('en attente d\'une recherche');
          }

    };

    const idArtistFilter = () => {
      state.items.map(item => {  
        console.log("dans ma fonction, mon id artist est", item.id);
        return item.id;
      })
    };
  

    const styleFilter = () => {
      const styleDatasArray = styleDatas.map(styleData => styleData.value);
      let styles = [];
      const styleSpotify = state.itemsArtists.items[0].genres;
      styleSpotify.map(style => {
       
        if (styleDatasArray.includes(style)) {
          styles = [...styles, style];
        }
        return null;
      });
      return styles.length > 0 ? styles[0] : "Autres";
    };

  return (
    <div id="search">
    
      <div id="search-container">
        <h1 id="search-h1">cherche un titre via l'api spotify</h1>
          <form>
            <label id="search-label" >
              <input
                type="text"
                id="search-input"
                placeholder="rechercher..."
                onChange={handleChange}
              />
          </label>
            <button id="search-button" type="submit" onClick={handleSubmit}>Envoyer</button>
        </form>

      <div id="search-containerListSearch">
            {!loading ?
                <ul id="search-ul"> 
                  
                  {state.items.map((item,key) => 

                    <li 
                    key ={key}
                    id="search-li"
                    >
                      <div id="search-containerInfos">
                        <img  id="search-cover" src={`${item.album.images[0].url}`} alt=""></img>
                        <h2 id="search-h2">{item.name} - {item.artists[0].name} 
                          <span id="search-span"> {item.album.release_date.slice(0,4)}</span>
                        </h2> 
                      </div>
                      
                      <p id="search-paragraph">SpotifyLink : <span id="search-spanParagraph"> {item.external_urls.spotify}</span></p>
                      <p id="search-paragraph">SpotifyCoverLinkTrack : <span id="search-spanParagraph">{item.album.images[0].url}</span></p>
                      <p id="search-paragraph">SpotifyTrackId :<span id="search-spanParagraph">{item.id}</span></p>
                      <p id="search-paragraph">Genres : <span id="search-spanParagraph">{styleFilter()}</span></p> 
                      
                    </li>
                  )}
                </ul> 
              :<p>En attente d'une recherche...<img src="./animal.png" id="search-imgloader" alt=""></img></p>}
        </div>
      </div>

      <div id="search-containerResultList">
          <h1 id="search-h1">Ma liste de titres spotify</h1>
      </div>    
    </div>  
    
  );
};
// == Export
export default Search;