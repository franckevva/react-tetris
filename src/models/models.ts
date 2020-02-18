export interface IPlayer {
    pos: { x: number, y: number },
    tetromino: Array<Array<number | string>>,
    collided: boolean,
}
