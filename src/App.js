import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const INITIAL_MATCHES = 25;
  const [totalMatches, setTotalMatches] = useState(INITIAL_MATCHES);
  const [isStart, setIsStart] = useState(false);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [resultMessage, setResultMessage] = useState('');

  const changeMode = () => setIsPlayerTurn((prev) => !prev);

  const gameOver = () => {
    if (playerMatches % 2 === 0) {
      setResultMessage(`🎉 You win with ${playerMatches} matches!`);
    } else {
      setResultMessage(`💻 Computer wins with ${computerMatches} matches!`);
    }
  };

  const takeMatches = (matchCount) => {
    if (isPlayerTurn && matchCount > 0 && matchCount <= 3) {
      setTotalMatches((prev) => prev - matchCount);
      setPlayerMatches((prev) => prev + matchCount);
      setIsPlayerTurn(false);
    }
  };

  const computerMove = () => {
    let matchesTaken = totalMatches % 4 === 0
      ? Math.floor(Math.random() * 3) + 1
      : totalMatches % 4;

    setTimeout(() => {
      setTotalMatches((prev) => prev - matchesTaken);
      setComputerMatches((prev) => prev + matchesTaken);
      setIsPlayerTurn(true);
    }, 1000);
  };

  useEffect(() => {
    if (totalMatches === 0) {
      gameOver();
    }
  }, [totalMatches]);

  useEffect(() => {
    if (!isPlayerTurn && totalMatches > 0 && isStart) {
      computerMove();
    }
  }, [isPlayerTurn, totalMatches, isStart]);

  const restartGame = () => {
    setTotalMatches(INITIAL_MATCHES);
    setPlayerMatches(0);
    setComputerMatches(0);
    setIsStart(false);
    setResultMessage('');
  };

  return (
    <div className="match-game">
      {isStart ? (
        <>
          <div className="match-game__pile">
            {Array.from({ length: totalMatches }).map(() => (
              <span key={uuidv4()}>🔥</span>
            ))}
          </div>

          <div className="match-game__action">
            <p>Take 1, 2, or 3 matches</p>
            <div className="match-game__buttons">
              {[1, 2, 3].map((count) => (
                <button key={count} onClick={() => takeMatches(count)}>
                  {'🔥'.repeat(count)} Take {count}
                </button>
              ))}
            </div>
          </div>
          {resultMessage && <p className="match-game__message">{resultMessage}</p>}
        </>
      ) : (
        <>
          <button className="match-game__mode" onClick={changeMode}>
            {isPlayerTurn ? 'Computer plays first' : 'Player plays first'}
          </button>
          <button className="match-game__start" onClick={() => setIsStart(true)}>
            Start game
          </button>
        </>
      )}
      {resultMessage && (
        <button className="match-game__restart" onClick={restartGame}>
          Restart Game
        </button>
      )}
    </div>
  );
}

export default App;
