import React from 'react';
import './cell.css';

export interface CellProps {
    id: number;
    isRevealed: boolean;
    isBomb: boolean;
    numOfBombs: number;
}

const Cell : React.FC<CellProps> = ({id: cellNum, isRevealed, isBomb, numOfBombs}) => {
    const getClassName = () => {
        return (
            "cell " +
            "revealed-"+(isRevealed ? "true" : "false") + " " +
            "bomb-"+(isBomb ? "true" : "false") + " "
        )
    }

    return (
        <div className={getClassName()} id={'cell-'+(cellNum)}>
            <span>{numOfBombs}</span>
        </div>
    );
};

export default Cell;