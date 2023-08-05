import LetterToGuess from "./LetterToGuess";
import Keyboard from './Keyboard';
import { useState } from "react";


function WordToGuess({word, processRightGuess, processWrongGuess, guessedLetters, triedLetters}) {
    const checkAndProcessLetter=function(letter) {
        if (word.toUpperCase().indexOf(letter) === -1) {
            processWrongGuess(letter);
        } else {
            processRightGuess(letter);
        }
    }

    return (<div>
        {word.split("").map(letter => <LetterToGuess letter={letter in guessedLetters ? letter : "_"}/>)}
        <Keyboard triedLetters={triedLetters} checkAndProcessLetter={checkAndProcessLetter}/>
    </div>  );
}

export default WordToGuess;