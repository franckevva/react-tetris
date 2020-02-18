import React, { useState } from 'react';

import { createStage } from '../gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

//Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0 });
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    }

    const dropPlayer = () => {
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
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"></Display>
                    ) : (
                            <div>
                                <Display text='Score' />
                                <Display text='Rows' />
                                <Display text='Level' />
                            </div>
                        )}

                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris;