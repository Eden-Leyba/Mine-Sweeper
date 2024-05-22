import React, { useEffect, useState } from 'react';
import Board, { BoardProps } from '../board/board';
import './game.css'
import { CellProps } from '../cell/cell';
import { generateRandomNumber } from '../../utils';

interface GameProps {
    difficulty: number;
};

const Game: React.FC<GameProps> = ({difficulty}) => {
    // 5 <= difficulty <= 15

    const numOfBombs = () : number => 
        (5 <= difficulty && difficulty <= 10) ? 
            generateRandomNumber(difficulty,1.5*difficulty):
            generateRandomNumber(2*difficulty,2.5*difficulty);
    // const numOfBombs = () : number => 1;
    const generateBoardProperties = () : BoardProps => {
        return {
            cellsInRow: 15, 
            numOfRows: 15,
            numOfBombs: numOfBombs()
        }
    };

    const [difficultyState, setDifficulty] = useState(10);

    //TODO: initialize Board with BoardProps and generateBoardProperties()
    return (
        <div className='game'>
            <header>
                <select name="difficulty" id="difficulty" 
                onChange={(e)=>setDifficulty(parseInt(e.target.value))} defaultValue="10">
                    <option value="5">Easy</option>
                    <option value="10">Medium</option>
                    <option value="15">Hard</option>
                </select>
            </header>
            <Board 
            cellsInRow={generateBoardProperties().cellsInRow} numOfRows={generateBoardProperties().numOfRows} 
            numOfBombs={generateBoardProperties().numOfBombs}
            />

            
        </div>
    );
}

export default Game;