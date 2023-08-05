import { useState } from 'react';
import './App.css';
import Gallows from './components/Gallows';
import StartGame from './components/StartGame';
import WordToGuess from './components/WordToGuess';
import Gameover from './components/Gameover';

// TODO
// congrats if won
// word via API
// play with css
// responsive design

function App() {
  const tryCountTotal = 5;
  const [tryCount, setTryCount] = useState(0);
  const [word, setWord] = useState("BEAR"); // change to API later; don't forget to uppercase
  const [guessedLetters, setGuessedLetters] = useState({});
  const [triedLetters, setTriedLetters] = useState({});

  const processWrongGuess = function(letter) {
    setTryCount(tryCount + 1);
    pushTriedLetter(letter);
  }

  const processRightGuess = function(letter) {
    pushTriedLetter(letter);
    pushGuessedLetter(letter);
    // if all guessed in word, show congrats - here or in return???
  }

  const pushGuessedLetter = function(letter) {
    if (letter in guessedLetters) return;
    const newGuessedLetters = {...guessedLetters};
    newGuessedLetters[letter] = true;
    setGuessedLetters(newGuessedLetters);
  }

  const pushTriedLetter = function(letter) {
    if (letter in triedLetters) return;
    const newTriedLetters = {...triedLetters};
    newTriedLetters[letter] = true;
    setTriedLetters(newTriedLetters);
  }

  const processStartGame = function() {
    setTryCount(0);
    setWord("BEAR"); // change to API later; don't forget to uppercase
    setGuessedLetters({});
    setTriedLetters({});
  }

  return (
    <div className="container">
      <Gallows tryCount={tryCount}/>
      <WordToGuess word={word} processRightGuess={processRightGuess} processWrongGuess={processWrongGuess} guessedLetters={guessedLetters} triedLetters={triedLetters}/>
      {tryCount >= tryCountTotal ? <Gameover/> : null}
      <StartGame processStartGame={processStartGame}/>
    </div>
  )
}

export default App;
