import React, {forwardRef, useImperativeHandle} from 'react';
import './cell.css';

export interface CellProps {
    id: number;
    isRevealed: boolean;
    isBomb: boolean;
    numOfBombs: number;
    isFlagged: boolean;
    onClick: any;
    onContextMenu: any;
}

const Cell = (props: CellProps) => {
    const getClassName = () => {
        return (
            "cell " +
            "revealed-"+(props.isRevealed ? "true" : "false") + " " +
            "bomb-"+(props.isBomb ? "true" : "false") + " "
        )
    }
    
    return (
        <div className={getClassName()} id={'cell-'+(props.id)} 
                onClick={() => props.onClick(props.id)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    props.onContextMenu(props.id);
                }}>
            {props.isRevealed && !props.isBomb &&
            <span>{props.numOfBombs === 0 ? "" : props.numOfBombs}</span>
            }
            {props.isBomb && props.isRevealed &&
            <img src="img/bomb.png" alt="" width="40" />
            }
            {props.isFlagged &&
            <img src="img/flag.png" alt="" />
            }
        </div>
    );
};

export default Cell;