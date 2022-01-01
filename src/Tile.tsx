

import { base } from "./constants";
import { TileProps } from "./types/tileTypes";


function Tile({ x, y, ground, object, entity }: TileProps) {

    return <div 
        key={`${x}-${y}`}
        style={{ 
            height: base,
            width: base,
            backgroundImage: `url(assets/tiles/${ground}.png)`,
            backgroundSize: 'cover',
            imageRendering: 'pixelated',
            position: 'relative',
        }}
    >
        { object 
            ? <img 
                src={`assets/tiles/${object}.png`} 
                style={{ 
                    position: 'absolute',
                    bottom: 0,
                    height: (object === 'tree' ? base * 3 : base), 
                    width: base, 
                    filter: 'drop-shadow(0 4px 4px rgba(0,0,0,.3))',
                    imageRendering: 'pixelated' 
                }} 
                alt={object}
            /> 
            : null 
        }
        { entity 
            ? <img 
                src={`assets/tiles/${entity}.png`} 
                style={{ 
                    position: 'absolute',
                    bottom: 0,
                    height: base * 2, 
                    width: base, 
                    filter: 'drop-shadow(0 4px 4px rgba(0,0,0,.3))',
                    imageRendering: 'pixelated' 
                }} 
                alt={object}
            /> 
            : null 
        }
    </div>

}
export default Tile;