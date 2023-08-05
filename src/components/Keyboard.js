function Keyboard({triedLetters, checkAndProcessLetter}) {
    const arrKeys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    return (<div className="keyboard-container">
                {arrKeys.map(letter => (letter in triedLetters ? 
                        <button className="keyboard-letter" disabled>{letter}</button> :
                        <button className="keyboard-letter" onClick={() => checkAndProcessLetter(letter)}>{letter}</button>))
                    }
            </div>
            )
}

export default Keyboard;