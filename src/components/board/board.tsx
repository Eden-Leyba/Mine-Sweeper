import React, { useMemo } from 'react';
import Cell, { CellProps } from '../cell/cell';
import './board.css'
import { generateRandomNumber } from '../../utils';

export interface BoardProps {
    cellsInRow: number;
    numOfRows: number;
    cellsWithBombs: number[];
}

const Board: React.FC<BoardProps> = ({cellsInRow, numOfRows, cellsWithBombs}) => {
    useMemo(() => {
        const numOfCells = numOfRows * cellsInRow;
        for(let i = 0; i < cellsWithBombs.length; i++) {
            let cellNum = -1;
            do {
                cellNum = generateRandomNumber(1,numOfCells);
            } while(cellsWithBombs[i] === null);
            cellsWithBombs[i] = cellNum;
        }
        
        
    },[]);

    const isCellABomb = (cell_num: number) : boolean => {
        return cellsWithBombs.indexOf(cell_num) != -1;
    }

    const generateRow = (row_num: number) => {
        const row = [];
        for(let i = 0; i < cellsInRow; i++) {
            const   cellId = row_num*cellsInRow+i+1,
                    isBomb = isCellABomb(cellId);
            row.push(
            <Cell 
                id={cellId}
                isBomb={isBomb} 
                isRevealed={true} 
                numOfBombs={-1} />
            );
        }
        return row;
    }

    const generateRows = () => {
        const rows = [];
        for(let i = 0; i < numOfRows; i++)
            rows.push(<div className='row'>{generateRow(i)}</div>);
        return rows;
    }

    return (
        <div className='board'> 
        {generateRows()}
        </div>
    );
}

export default Board;