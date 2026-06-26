import React from "react";
import styled from "styled-components";

const size = {
    small: `
		padding: 8px 10px;
		font-size: 12px;
		font-weight:400;
		`,
    medium: `
		padding:10px 20px;
		font-size:16px;
		font-weight:500;
		`,
    large: `
		padding:15px 25px;
		font-size:18px;
		font-weight:600;
		`,
    other: `
		padding:10px 0px;
		font-size:15px;
		font-weight:400;
		`,
};

const ClickBtn = styled.button`
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
`;
const HoverBtn = styled.button`
    background-color: green;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
`;
const Btn = styled.button`
    background-color: white;
    padding: 10px 5px;
    font-size: 16px;
    border: 1px solid black;
    cursor: pointer;
`;

function Buttons() {
    return (
        <div>
            <ClickBtn>Click me</ClickBtn>
            <HoverBtn>Hover me</HoverBtn>
            <Btn size="small">Small Button</Btn>
            <Btn size="medium">Medium Button</Btn>
            <Btn size="large">Large Button</Btn>
            <Btn size="other">Other Button</Btn>
        </div>
    );
}

export default Buttons;
