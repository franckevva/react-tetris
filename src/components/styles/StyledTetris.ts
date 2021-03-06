import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${bgImage}) #000;
    background-size: cover;
    overflow: hidden;
    color: #fff;
    font-family: Pixel, Arial, Helvetica, sans-serif;
`

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    max-width: 1200px;
    justify-content: center;
    height: calc(100vh - 50px);

    aside {
        width: 100%;
        max-width: 250px;
        display: block;
        padding: 0 20px;
    }

    .hint {
        margin: 0 10px;
        color: white;
        font-size: 0.75rem;
        font-family: Pixel, Arial, Helvetica, sans-serif;
        line-height: 1.75;
        align-self: flex-end;
    }
`