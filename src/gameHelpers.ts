export const STAGE_WIDTH: number = 12;
export const STAGE_HEIGHT: number = 20;

export const createStage = (): any => {
    return Array.from(Array<any>(STAGE_HEIGHT), () =>
        new Array<[number, string]>(STAGE_WIDTH).fill([0, 'clear'])
    );
}