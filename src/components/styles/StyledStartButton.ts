import styled from 'styled-components';

export const StyledStartButton = styled.button`
    box-sizing: border-box;
    padding: 20px;
    margin: 10px 0;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    border: none;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;

    :disabled {
        background: 111;
        color: #666;
    }
`