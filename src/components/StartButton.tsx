import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const StartGame = ({ callback, text, disabled = false }: { callback: any, text: string, disabled?: boolean }) => (
    <StyledStartButton onClick={() => callback()}
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}>
        {text}
    </StyledStartButton>
)
export default StartGame;