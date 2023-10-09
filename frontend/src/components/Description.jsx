import { useEffect, useState } from "react";
import data from './data/monsters.json';
import '../App.css';
import PropTypes from 'prop-types';

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

Description.propTypes = {
    arrayIndex: PropTypes.number.isRequired,
};

export default Description;