import React from 'react';

function Box({ width = 100, height = 100, backgroundColor, removeBox, id }) {
    const style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: backgroundColor
    }

    const handleClick = evt => {
        evt.preventDefault();
        removeBox(evt.target.parentNode.id);
    };

    return <div id={id} style={style}>
        <button onClick={handleClick}>X</button></div>
}

export default Box;