

import { useEffect, useState } from "react";
import { generateBoard, createPlayer, listenForKeypress, clone } from "./helpers";
import Tile from "./Tile";
import { Player } from "./types/playerTypes";
import { TileProps } from "./types/tileTypes";


function App() {

    const [board, setBoard] = 
        useState<TileProps[][]>(generateBoard());
        
    const [player, setPlayer] = useState<Player>(
        createPlayer(board) 
        ?? { facing: 'right', x: 0, y: 0 } as Player
    );

    const [ oldPlayer, setOldPlayer ] = useState<Player>({ ...player });

    useEffect(() => {
        listenForKeypress(player, board, setPlayer);
    }, []);

    useEffect(() => {

        const newBoard = clone(board);
        setOldPlayer(player);
        newBoard[player.y][player.x].entity = 'player';  
        newBoard[oldPlayer.y][oldPlayer.x].entity = undefined;

        setBoard(newBoard);

    }, [player]);

    return <div style={{ boxShadow: '0 0 20px rgba(0,0,0,.6)' }}>
        { board.map((row, y) => {
            return <div style={{ display: 'flex' }} key={`row-${y}`}>
                { row.map((tile, x) =>
                    <Tile {...tile} key={`tile-${y}-${x}`} />
                ) }
            </div>
        }) }
    </div>;
}

export default App;
