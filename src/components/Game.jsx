import React, { useState } from 'react'
import { calculateWinner } from '../helper';
import Board from './Board';
import './Game.css';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const xO = xIsNext ? 'X' : 'O';
    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];
     
        if(winner || squares[i]) return;

        squares[i] = xO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
    };
const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
};

    const renderMoves =() => 
    history.map((_step, move) => {
        const destination = move ? `Go to move #${move}` : 'Go to Start';
        return (
            <li key={move}><button onClick={() => jumpTo(move)}>{destination}</button></li>
        );
    });



    return (

<div className='info-wrapper'>
        <div className='header'>
<h1 className='lets'>Let's Play <br/>React Tic-Tac-Toe </h1>
        <h2 className='winnermonitor'>{winner ? 'Winner: ' + winner : 'Next Player: ' + xO}</h2>
        <h1>History</h1>
          <button className='history-button'>{renderMoves()}</button>
</div>
<div className='board'>
<Board squares={history[stepNumber]} onClick={handleClick} />
</div>
       </div>

    );
};

export default Game;