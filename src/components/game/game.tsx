import React, { useRef, useState } from 'react';
import Board, { BoardProps } from '../board/board';
import './game.css'
import { CellProps } from '../cell/cell';
import { generateRandomNumber } from '../../utils';

interface GameProps {
    difficultyProp: number;
};

const Game: React.FC<GameProps> = ({difficultyProp}) => {
    // 5 <= difficulty <= 15

    const [difficulty, setDifficulty] = useState(difficultyProp);
    
    const numOfBombsFunc = () : number => 
        (5 <= difficulty && difficulty <= 10) ? 
            generateRandomNumber(difficulty,1.5*difficulty):
            generateRandomNumber(2*difficulty,2.5*difficulty);

    const [numOfBombs, setNumOfBombs] = useState(numOfBombsFunc());
    
    // const numOfBombs = () : number => 1;
    const generateBoardProperties = () : BoardProps => {
        return {
            cellsInRow: 15, 
            numOfRows: 15,
            numOfBombs: numOfBombs
        }
    };

    
    const handleChange = (value: number) => {
        setDifficulty(value);
        setNumOfBombs(numOfBombsFunc());
    }

    let restartBoard : () => void;

    const handleRestart = () => {
        // ref.current.setNumOfBombs();
    }

    const generateBoard = () => {
        // return 
    }

    // useMemo(() => {
    //     restartBoard = 
    // },[]);

    //TODO: initialize Board with BoardProps and generateBoardProperties()
    return (
        <div className='game'>
            <header>
                <div className="left">
                    <h1>Mine Sweeper</h1>
                </div>
                <div className="right">
                    <input type="button" value="Restart Game" 
                    onClick={() => {
                        setNumOfBombs(numOfBombsFunc())
                    }} />
                    
                    <select name="difficulty" id="difficulty" 
                    onChange={(e)=>handleChange(parseInt(e.target.value))} 
                    defaultValue="10">
                        <option value="5">Easy</option>
                        <option value="10">Medium</option>
                        <option value="15">Hard</option>
                    </select>
                    
                </div>
            </header>
            
            {/* {generateBoard()} */}
            <Board 
                cellsInRow={generateBoardProperties().cellsInRow} numOfRows={generateBoardProperties().numOfRows} 
                // numOfBombs={generateBoardProperties().numOfBombs}
                numOfBombs={numOfBombs}
            />
            
        </div>
    );
}

export default Game;