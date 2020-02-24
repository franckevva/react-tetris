import React from 'react';
import { StyledCell, StyledEmptyCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type, isNewElement = false }: { type: any, isNewElement?: boolean }) =>
    (
        isNewElement && !type ?
            <StyledEmptyCell /> :
            <StyledCell type={type} color={TETROMINOS[type].color} />
    )
export default React.memo(Cell);