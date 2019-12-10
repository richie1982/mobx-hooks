import React, { useContext, createContext, useState } from 'react';
import { useLocalStore, useObserver } from 'mobx-react'


const CTX = createContext()

const Store = ({children}) => {

  const state = useLocalStore(() => ({
    movies: ["Guyver", "Hokuto no Ken"],
    addMovie: (mov) => {
      state.movies.push(mov)
    },
    deleteMovie: (mov) => {
      state.movies = state.movies.filter(el => el !== mov)
    },
    get count() {
      return state.movies.length
    }

  }))

  return(
    <CTX.Provider value={state}>
      {children}
    </CTX.Provider>
  )
}

// 
const MovieList = () => {

  const store = useContext(CTX)

  const handleClick = (mov) => {
    store.deleteMovie(mov)
  }

  return useObserver(() => (
    <div>
      <ul>
        {store.movies.map(movie => <li key={movie}>{movie} <button onClick={() => handleClick(movie)}>Delete</button></li>)}
      </ul>
    </div>
  ))
}

// 
const MovieForm = () => {

  const store = useContext(CTX)
  const [ input, setInput ] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    store.addMovie(input)
    setInput("")
  }

  return(
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter Movie..."
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        <button>
          Submit
        </button>
      </form>
    </div>
  )
}


// 
const MovieCounter = () => {
  const store = useContext(CTX)
  return useObserver(() => (
    <div>
      {store.count}
    </div>
  ))
}

// 
function App() {

  return (
    <Store>
      <MovieCounter/>
      <MovieList/>
      <MovieForm/>
    </Store>
  );
}

export default App;
