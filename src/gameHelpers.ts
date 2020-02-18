import { IPlayer } from "./models/models";

export const STAGE_WIDTH: number = 12;
export const STAGE_HEIGHT: number = 20;

export const createStage = (): any => {
    return Array.from(Array<any>(STAGE_HEIGHT), () =>
        new Array<[number, string]>(STAGE_WIDTH).fill([0, 'clear'])
    );
}

export const checkCollision = (player: IPlayer, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {

            // 1. Check if we are on actual Tetromino cell

            if (player.tetromino[y][x] !== 0) {
                if (
                    // 2. Check that our move inside the game areas height(y)
                    // We shouldn't go through the botto, of the play area
                    !stage[y + player.pos.y + moveY] ||
                    // 3. Check that our move is inside the game areas width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. Check that cell wer'e moving to isn't set to clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }

        }
    }
}