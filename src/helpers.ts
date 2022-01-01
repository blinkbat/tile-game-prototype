

import { boardSize } from "./constants";
import { TileObject, TileProps } from "./types/tileTypes";
import { validKeys } from "./constants";
import { Player } from "./types/playerTypes";

export const clone = (items: any[]): any[] => items.map(
    item => Array.isArray(item) ? clone(item) : item
);

export const getObjectOpt = (): TileObject | undefined => {
    if (Math.random() > 0.7) {
        let obj: TileObject = 'rock';
        if (Math.random() > 0.35) obj = 'tree';
        if (Math.random() > 0.65) obj = 'bush';
        if (Math.random() > 0.95) obj = 'chest';
        return obj;
    }
    return undefined;
}

export const createPlayer = (boardData: TileProps[][]): Player | undefined => {

    const rand = { 
        x: Math.floor(Math.random() * (boardSize * 2)), 
        y: Math.floor(Math.random() * boardSize) 
    };

    if (!boardData[rand.y][rand.x].object) {
        return ({ x: rand.x, y: rand.y, facing: 'right' });
    } else {
        createPlayer(boardData);
    }

    return undefined;
}

export const generateBoard = () => {

    const boardData: TileProps[][] = [];

    for (let y = 0; y < boardSize; y++) {

        const row: TileProps[] = [];

        for (let x = 0; x < boardSize * 2; x++) {

            const ground = Math.random() < 0.33 ? 'grass1' : Math.random() < 0.66 ? 'grass2' : 'grass3';
            const object = getObjectOpt();

            row.push({ x, y, ground, object });
        }
        boardData.push(row);
    }

    return boardData;
}

export const listenForKeypress = (
    currPlayer: Player,
    board: TileProps[][],
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
) => {

    window.addEventListener('keydown', (e) => {

        if (validKeys.includes(e.key)) {

            const { x, y } = currPlayer;
            const newX = x + (
                e.key === 'ArrowRight' 
                    ? 1 : e.key === 'ArrowLeft' 
                        ? -1 : 0
            );
            const newY = y + (
                e.key === 'ArrowDown' 
                    ? 1 : e.key === 'ArrowUp' 
                        ? -1 : 0
            );

            if (
                (newX >= 0 && newX < boardSize * 2)
                && (newY >= 0 && newY < boardSize)
                && !board[newY][newX].object
            ) {
                setPlayer(prevPlayer => ({ ...prevPlayer, x: newX, y: newY }));
            }
        }
    });
}
