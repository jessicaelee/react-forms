import React, { useState } from 'react';
import uuid from "uuid/v4";
import Box from './Box';
import NewBoxForm from './NewBoxform'


function Boxlist() {
    const [boxes, setBoxes] = useState([{ width: 100, height: 100, backgroundColor: "red", id: "key" }])

    const renderBoxes = () => {
        return boxes.map(box =>
            (<Box key={box.id} width={box.width} height={box.height} backgroundColor={box.backgroundColor} removeBox={removeBox} id={box.id} />))
    };

    const addBox = box => {
        let newBox = { ...box, id: uuid() };
        setBoxes(boxes => [...boxes, newBox])
    }

    const removeBox = id => {
        let updatedBoxes = boxes.filter(box => box.id !== id);
        setBoxes(updatedBoxes);
    }

    return (<div>
        <ul> {renderBoxes()} </ul>
        <NewBoxForm addBox={addBox} />
    </div>)

};


export default Boxlist;