import { useEffect, useState } from "react";
import data from './data/monsters.json';
import '../App.css';

function Description({arrayIndex}) {
    const [text, setText] = useState('');

    useEffect(() => {
        setText(data[arrayIndex].description)
    }, [arrayIndex])

    return (
        <div>
            {text}
        </div>
    )
}

export default Description;