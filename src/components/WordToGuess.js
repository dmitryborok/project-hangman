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

    return (<>
            <div className="word-container">
                {word.split("").map(letter => <LetterToGuess letter={letter in guessedLetters ? letter : "_"}/>)}
            </div>
            <Keyboard triedLetters={triedLetters} checkAndProcessLetter={checkAndProcessLetter}/>
        </>  );
}

export default WordToGuess;