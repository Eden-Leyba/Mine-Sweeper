import React, { useEffect } from 'react';
import Board, { BoardProps } from '../board/board';
import './game.css'
import { CellProps } from '../cell/cell';
import { generateRandomNumber } from '../../utils';

interface GameProps {
    difficulty: number;
};

const Game: React.FC<GameProps> = ({difficulty}) => {
    // 4 <= difficulty <= 10

    const numOfBombs = () : number => 
        generateRandomNumber(difficulty,2*difficulty);

    const generateBoardProperties = () : BoardProps => {
        return {
            cellsInRow: difficulty, 
            numOfRows: difficulty,
            cellsWithBombs: []
        }
    };

    //TODO: initialize Board with BoardProps and generateBoardProperties()
    return (
        <div className='game'>
            <Board cellsInRow={generateBoardProperties().cellsInRow} numOfRows={generateBoardProperties().numOfRows} cellsWithBombs={new Array<number>(numOfBombs())}/>
        </div>
    );
}

export default Game;