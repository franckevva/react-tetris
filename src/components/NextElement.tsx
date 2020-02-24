import React from 'react';

import { StyledStageNewElement } from './styles/StyledStage';

import Cell from './Cell';

const NextElement = ({ nextElement }) => (
    <StyledStageNewElement width={nextElement[0].length} height={nextElement.length}>
        {nextElement.map((row: Array<any>) =>
            row.map((cell, x) => (
                <Cell isNewElement={true} key={x} type={cell} />
            )))}
    </StyledStageNewElement>
) 
export default NextElement;