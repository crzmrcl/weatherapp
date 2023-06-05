import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/index';
import Home from './pages/Home/index';
import Weather from './pages/Weather/index';
import React, { useState } from 'react';

// Use this to pass the location state from Home Page to Weather Page using useContext hook
export const Context = React.createContext();

function App() {

  // Use this to pass the location state from Home Page to Weather Page using useContext hook
  const [ location, setLocation ] = useState('');

  return (
    <div className="App">
      <Context.Provider value={[ location, setLocation ]} >
        <Router>
          <Routes>
            <Route path='/' element={ <Landing /> } />
            <Route  path='/home' element={ <Home /> } />
            <Route path='/weather' element={ <Weather /> } />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
