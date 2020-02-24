import styled from 'styled-components';

interface IStageProps {
    width: number;
    height: number
}

export const StyledStage = styled.div<IStageProps>`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(25vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 25vw;
    background: #111;
`

export const StyledStageNewElement = styled.div<IStageProps>`
    width: calc(100px / 4 * ${props => props.width});
    height: calc(100px / 4 * ${props => props.width});;
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(100px / 4 )
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    background: transparent;
`