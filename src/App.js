import { useState } from 'react';
import './App.css';
import Gallows from './components/Gallows';
import StartGame from './components/StartGame';
import WordToGuess from './components/WordToGuess';
import Gameover from './components/Gameover';
import Congrats from './components/Congrats';
import Definition from './components/Definision';
import jQuery from 'jquery';

const URL_WORD = "https://random-word-api.herokuapp.com/word?length="
const URL_DICT = "https://api.dictionaryapi.dev/api/v2/entries/en/"
// TODO
// score (and different colours depending on score)
// congrats if won
// word via API
// play with css
// responsive design

function App() {
  const tryCountTotal = 5;
  const [tryCount, setTryCount] = useState(0);
  const [word, setWord] = useState("BEAR"); // change to API later; don't forget to uppercase
  const [definition, setDefinition] = useState("noun: Wild animal"); // change to API later; don't forget to uppercase
  const [guessedLetters, setGuessedLetters] = useState({});
  const [triedLetters, setTriedLetters] = useState({});

  const randomInteger = function (low, hi) {
    return Math.floor(Math.random() * (hi - low + 1)) + low;
  }

  const parseDefinition = function(response) {
      const meanings = response[0].meanings;
      for (let meaning of meanings) {
         if (meaning.partOfSpeech === "noun") {
            return "noun: " + meaning.definitions[randomInteger(0, meaning.definitions.length)].definition;
         }
      }
      // if no noun found
      return meanings[0].partOfSpeech + ": " + meanings[0].definitions[0].definition;
  } 

  const wordGuessed = function() {
     if (Object.keys(guessedLetters).length === 0) return false;
     return (word.split("").every(char => char in guessedLetters)) 
  }

  const processWrongGuess = function(letter) {
    setTryCount(tryCount + 1);
    pushTriedLetter(letter);
  }

  const processRightGuess = function(letter) {
    pushTriedLetter(letter);
    pushGuessedLetter(letter);
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

  const processStartGame = async function(numberOfLetters) {
    let wordFromAPI;
    let definitionFromAPI;
    try {
      wordFromAPI = await jQuery.get(URL_WORD + numberOfLetters);
      definitionFromAPI = await jQuery.get(URL_DICT + wordFromAPI[0]);
      console.log("wordFromAPI: ", wordFromAPI);
      console.log("definitionFromAPI", definitionFromAPI);
      setWord(wordFromAPI[0].toUpperCase());
      setDefinition(parseDefinition(definitionFromAPI));
      setTryCount(0);
      setGuessedLetters({});
      setTriedLetters({});
    } catch {
       console.log("Something went wrong: wordFromAPI = ", wordFromAPI, "definitionFromAPI = ", definitionFromAPI);
      processStartGame(numberOfLetters);
    }
}

  return (
    <div className="container">
      <Gallows tryCount={tryCount}/>
      <Definition definition={definition}/>
      <WordToGuess word={word} processRightGuess={processRightGuess} processWrongGuess={processWrongGuess} guessedLetters={guessedLetters} triedLetters={triedLetters}/>
      {wordGuessed() ? <Congrats/> : null}
      {tryCount >= tryCountTotal ? <Gameover word={word}/> : null}
      <StartGame processStartGame={processStartGame}/>
    </div>
  )
}

export default App;
