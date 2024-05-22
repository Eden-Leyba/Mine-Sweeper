import React, { useMemo, forwardRef, useRef, useImperativeHandle, useState} from 'react';
import Cell, { CellProps } from '../cell/cell';
import './board.css'
import { generateRandomNumber } from '../../utils';

export interface BoardProps {
    cellsInRow: number;
    numOfRows: number;
    numOfBombs: number
}

export const numOfCells = (props: BoardProps) => 
    props.numOfRows * props.cellsInRow;

let cellsWithBombs: number[];

const Board: React.FC<BoardProps> = (props) => {

    const initCellsData = () => {
        let cellsData = [];
        const numOfCellsCached = numOfCells(props);
        
        for(let i = 0; i <= numOfCellsCached; i++) {
            cellsData.push({
                id: i,
                numOfBoms: 0,
                isRevelead: false,
                isFlagged: false,
                isBomb: false
            });
        }
        return cellsData;
    }
    
    const [cells, setCells] = useState(initCellsData());

    const neighbours = (cellNum: number) => {
        /*  Given cellNum i, a neighbour can appear:
            -To its left or right: i-1 or i+1 resp.
            -To its top or bottom: i-cellsInRow or i+cellsInRow resp.
            -At the diagonals: i-cellsInRow-1 or i-cellsInRow+1 or i+cellsInRow-1 or i+cellsInRow+1 
        */
        const cellsInRow: number = props.cellsInRow;
        const numOfCellsCached: number = numOfCells(props);
        const neighbours = [];

        //right
        if(cellNum % cellsInRow != 0) 
            neighbours.push(cellNum+1);

        //left
        if(cellNum % cellsInRow != 1) 
            // cells[cellNum-1].numOfBoms++;
            neighbours.push(cellNum-1);

        //top
        if(cellNum > cellsInRow) 
            neighbours.push(cellNum-cellsInRow);
            
        //bottom
        if(cellNum + cellsInRow <= numOfCellsCached)
            neighbours.push(cellNum+cellsInRow);
            
        //top left diagonal
        if(cellNum-cellsInRow-1 > 0 &&
            cellNum % cellsInRow != 1)
            neighbours.push(cellNum-cellsInRow-1);
            
        //top right diagonal
        if(cellNum-cellsInRow+1 > 0 &&
            cellNum % cellsInRow != 0)
            neighbours.push(cellNum-cellsInRow+1);
            
        //bottom left diagonal
        if(cellNum + cellsInRow-1 <= numOfCellsCached && 
            cellNum % cellsInRow != 1)
            neighbours.push(cellNum+cellsInRow-1);
        
        //bottom right diagonal
        if(cellNum + cellsInRow+1 <= numOfCellsCached &&
            cellNum % cellsInRow != 0)
            neighbours.push(cellNum+cellsInRow+1);
        
        return neighbours;
    }

    useMemo(() =>{
        
        cellsWithBombs = new Array<number>(numOfCells(props)+1);
        
        
        for(let i = 0; i < props.numOfBombs; i++) {
            let cellNum = -1;
            //Find a free cell number to put the bomb into
            do {
                cellNum = generateRandomNumber(1,numOfCells(props));
            } while(cellsWithBombs.indexOf(cellNum) != -1);

            //Put the bomb
            cellsWithBombs[i] = cellNum;
            
            cells[cellNum].isBomb=true;
            //Update adjacent cells field: numOfBombs
            neighbours(cellNum).map((neighbourNum) => {
                cells[neighbourNum].numOfBoms++;
            });
            
        }
        
    }, []);

    const generateRow = (row_num: number) => {
        const row = [];
        for(let i = 0; i < props.cellsInRow; i++) {
            const   cellId = row_num*props.cellsInRow+i+1;
            //         isBomb = isCellABomb(cellId);
            
            // row.push(
            //     <Cell 
            //     id={cellId}
            //     isBomb={isBomb} 
            //     isRevealed={true} 
            //     numOfBombs={numOfBoms[cellId]} 
                
            //     onClick={() => handleClick(cellId)}/>
            // );
            row.push(<Cell 
                id={cells[cellId].id}
                isBomb={cells[cellId].isBomb}
                isRevealed={cells[cellId].isRevelead}
                numOfBombs={cells[cellId].numOfBoms}
                isFlagged={cells[cellId].isFlagged}

                onClick={handleClick}
                onContextMenu={handleContextMenu}
                />) 
        }
        return row;
    }
    
    const generateRows = () => {
        const rows = [];
        for(let i = 0; i < props.numOfRows; i++)
            rows.push(<div className='row'>{generateRow(i)}</div>);
        return rows;
    }

    const revealEmptyCells = (cellNum: number) => {
        cells[cellNum].isRevelead = true;
        const neighbours_arr = neighbours(cellNum);
        neighbours_arr.map(neighbourNum => {
            if(!cells[neighbourNum].isRevelead && !cells[neighbourNum].isBomb && !cells[neighbourNum].isFlagged) {
                cells[neighbourNum].isRevelead = true;
                if(cells[neighbourNum].numOfBoms == 0)
                    revealEmptyCells(neighbourNum);
            }
        });
    }

    const restartBoard = () => {
        setCells(initCellsData());
    }

    const revealAll = () => {
        const newCells = cells.map((cell, index) => {
            cells[index].isRevelead = true;
            return cell;
        });
        setCells(newCells);
    }

    const handleClick = (cellNum: number) => {
        const newCells = cells.map((cell, index) => {
            if(index == cellNum) {
                const newCell = cell;
                if(!cell.isRevelead) {
                    if(cell.isBomb) {
                        
                        alert("Game Over");
                        revealAll();
                    }
                    else {
                        revealEmptyCells(cellNum);
                    }
                }
            }
            return cell;
        });
        setCells(newCells);
    }

    const handleContextMenu = (cellNum: number) => {
        const newCells = cells.map((cell, index) => {
            if(index == cellNum) {
                const newCell = cell;
                if(!cell.isRevelead) {
                    newCell.isFlagged = !newCell.isFlagged;
                }
            }
            return cell;
        });
        setCells(newCells);
    }

    return (
        <div className='board'> 
        {generateRows()}
        </div>
    );
}

export default Board;