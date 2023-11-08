import React from 'react';
import './Title.css';
import Line from "../line/Line";

interface TitleProps {
  progress: number
}

function Title(props: TitleProps) {
    return (
        <div className="title" style={{opacity: Math.pow(Math.sin(props.progress*Math.PI), 1)}} >
            <Line></Line>
            <h1>Tangram</h1>
            <Line></Line>
        </div>
    );
}

export default Title;
