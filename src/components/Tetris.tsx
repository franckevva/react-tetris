import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

//Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setDropTime(1000);
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            // increase speed
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // Game Over
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                // Left
                case 37:
                    movePlayer(-1);
                    break;
                // Right
                case 39:
                    movePlayer(1);
                    break;
                // Down
                case 40:
                    dropPlayer();
                    break;
                // Up - rotate
                case 38:
                    playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex={0} onKeyDown={e => move(e)} onKeyUp={e => keyUp(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"></Display>
                    ) : (
                            <div>
                                <Display text={`Score: ${score}`} />
                                <Display text={`Rows: ${rows}`} />
                                <Display text={`Level: ${level}`} />
                            </div>
                        )}

                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris;