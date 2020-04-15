import React, { useState, useEffect } from "react";
import {Links, Header, Modal, Results, SearchForm} from './components'
import { read } from './firebase/Database'
import { authenticateUser } from './firebase/Auth'

const constants = {
  BASE_URL: 'http://www.omdbapi.com/?',
  API_KEY: 'c044a8f8'
}

const App = () => {
  const [state, setState] = useState({
    isSearching: false,
    active: "search",
    movies: [],
    favorites: [],
    query: "", //resultat de la requête,
    currentUser: null
  });

  const onTextChange = input => {
    setState({ ...state, isSearching: input.length > 0, query: input }) // on verifie si l'user tape ou non
  }

  const handleClick = link => {
    setState({...state, active: link, query: ""})
  }

  const toggleFavorite = () => {
    fetchDB(state.currentUser)
  }

  const fetchAPI = () => {
    if(!state.query) { return }
    const url = `${constants.BASE_URL}s=${state.query}&apikey=${constants.API_KEY}`
    fetch(url)
      .then(res => {
        if(!res.ok) { throw Error(res.statusText)}
        return res.json()
      })
      .then(data => {
        if(data.Response !== 'False')
        setState({...state, movies: create(data.Search)})
      })
  }

  const fetchDB = user => {
    read()
    .then(snapshot => {
      const favorites = snapshot.docs.filter(doc => doc.data().user === user.email).map(doc => doc.data().item)
      const imdbs = favorites.map(fav => fav.imdb)
      const updated = state.movies.map(movie => {
        movie.isFavorite = imdbs.includes(movie.imdb)
        return movie
      })
      setState({...state, favorites: favorites, movies: updated})
    })
    .catch(err => console.log(err))
  }

  const create = data => {
    const imdbs = state.favorites.map(fav => fav.imdb)
    return data.map(item => {
      return {title: item.Title, imdb: item.imdbID, year: item.Year, type: item.Type, poster: item.Poster, isFavorite: imdbs.includes(item.imdbID)}
    })
  }

  useEffect(() => {
    fetchAPI()
    // eslint-disable-next-line
  }, [state.query])

  useEffect(() => {
    authenticateUser().then(user => {
      setState({...state, currentUser: user})
    }).catch(() => {
      setState({...state, currentUser: null})
    })
    // eslint-disable-next-line
  }, [state.currentUser])

  useEffect(() => {
    fetchDB(state.currentUser)
    // eslint-disable-next-line
  }, [state.currentUser, state.active])

  return (
    <div className="App" id="search-container">
      <Modal {...state} />
      <Header {...state} />
      <Links {...state} handleClick={handleClick}/>
      <main>
        <SearchForm query={state.query} onTextChange={onTextChange}/>
        <Results {...state} toggleFavorite={toggleFavorite} />
      </main>
    </div>
  );
};
export default App;
