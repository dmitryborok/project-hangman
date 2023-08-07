function StartGame({processStartGame}) {
    return (<div>
        Guess a <input id="word-length" type="number" min="1" max="15" defaultValue="4"></input>-letter word...
        <button onClick={() => processStartGame(document.getElementById('word-length').value)}> Start!</button> 
    </div>  );
}

export default StartGame;