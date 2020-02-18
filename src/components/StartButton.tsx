import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const StartGame = ({ callback }) => (
    <StyledStartButton onClick={callback}>Start game</StyledStartButton>
)
export default StartGame;