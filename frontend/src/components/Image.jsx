import { useEffect, useState } from "react";
import data from './data/monsters.json';
import '../App.css';

import PropTypes from 'prop-types';

function Image ({arrayIndex}) {

    const [imageName, setImageName] = useState(0);

    useEffect(() => {
        setImageName(data[arrayIndex].image);
    }, [arrayIndex]);

    return (
        <>
            <img src={`images/${imageName}`} alt="display name not found" className="img-float basic-borders"/>
        </>
    )
}

Image.propTypes = {
  arrayIndex: PropTypes.number.isRequired
};


export default Image;