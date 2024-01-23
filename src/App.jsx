import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './components/winning-combinations';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState('X');
    let gameBoard = initialGameBoard;

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    const currentPlayer = deriveActivePlayer(gameTurns);

    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = firstSquareSymbol;
        }
    }

    const handleActivePlayer = (rowIndex, colIndex) => {
        // setActivePlayer((curPlayer) => (curPlayer === 'X' ? 'O' : 'X'));
        const currentPlayer = deriveActivePlayer(gameTurns);
        setGameTurns((prevTurns) => {
            let currentPlayer = 'X';
            if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
                currentPlayer = 'O';
            }
            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    };
    return (
        <main>
            <div id='game-container'>
                <ol
                    id='players'
                    className='highlight-player'
                >
                    <Player
                        initialName='Player 1'
                        symbol='X'
                        isActive={currentPlayer === 'X'}
                    />
                    <Player
                        initialName='Player 2'
                        symbol='O'
                        isActive={currentPlayer === 'O'}
                    />
                </ol>
                {winner && <p>You won, {winner}!</p>}
                <GameBoard
                    onActivePlayer={handleActivePlayer}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
