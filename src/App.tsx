import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Game from "./components/game/game";

function App() {
  return (
    <Game difficultyProp={15} />
  );
}

export default App;
