

export interface TileProps {
    x: number;
    y: number;
    ground: GrassTypes | 'dirt';
    object?: TileObject;
    entity?: 'player' | 'enemy';
}

export type TileObject = 'rock' | 'bush' | 'tree' | 'chest';

export type GrassTypes = 'grass1' | 'grass2' | 'grass3';