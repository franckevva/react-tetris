import styled from 'styled-components';


export const StyledSpeedBox = styled.div`
    margin: 15px 0;
    padding: 10px;
    border: 1px dashed grey;

    div { 
        display: flex;
        justify-content: space-between;
    }

    button {
        outline: none;
        box-sizing: border-box;
        padding: 15px;
        margin: 10px;
        border-radius: 5px;
        border: none;
        color: white;
        background: #333;
        font-size: 1rem;
        outline: none;
        cursor: pointer;
    }
`