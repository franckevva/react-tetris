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
import NextElement from './NextElement';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameBreak, setGameBreak] = useState(false);
    const [gameStarted, setGameStart] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        console.log('start game');
        setStage(createStage());
        resetPlayer();
        setDropTime(1000);
        setGameOver(false);
        setGameStart(true);
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

    const keyEventListener = ({ keyCode }) => {
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
                // Ctrl - rotate
                // Up - rotate
                case 17:
                case 38:
                    playerRotate(stage, 1);
                    break;
                // Space - pause/continue game
                case 32:
                    breakGame();
                    break;
                // Enter - start new game
                case 13:
                    startGame();
                    break;
            }
        }
    }

    const breakGame = () => {
        if (gameBreak) {
            setDropTime(1000 / (level + 1) + 200);
        } else {
            setDropTime(null);
        }
        setGameBreak(prev => !prev);
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex={0} onKeyDown={e => keyEventListener(e)} onKeyUp={e => keyUp(e)}>
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

                    <StartButton text={gameBreak ? "Continue" : "Pause"} callback={breakGame} disabled={!gameStarted || gameOver} />
                    <StartButton text="Start game" callback={startGame} />
                    { gameStarted ? <NextElement nextElement={player.nextTetromino}/> : null }
                </aside>
                <div className="hint">
                    <p>Hint:</p>
                    <ul>
                        <li>UP&emsp;&emsp;&emsp;- rotate</li>
                        <li>Ctrl &emsp;- rotate</li>
                        <li>Left &emsp;- move to left</li>
                        <li>Right&emsp;- move to right</li>
                        <li>Down &emsp;- increase speed to down</li>
                        <li>Space&emsp;- pause/continue game</li>
                        <li>Enter&emsp;- start game</li>
                    </ul>
                </div>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris;