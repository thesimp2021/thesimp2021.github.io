import React, {useState, useEffect} from 'react';
import {imageDb} from '../database';
import {Progress, Button} from "reactstrap";

import _ from 'lodash';

const GameResult = (props) => {
    console.log('ini propz', props);
    const totalCorrectAnswer = _.get(props, 'location.state.correct');
    const [imageId, setImageId] = useState(0);

    const getCorrectPercentage = () => {
        return Math.floor(((totalCorrectAnswer - 5) / 16) * 100);
    }

    const getResultText = () => {
      const correctPercentage = getCorrectPercentage();
      if (correctPercentage > 75) return "YOU DOING GREAT!!! 👍"
      if (correctPercentage > 50) return "aight you okay 🤷‍♀️"
      if (correctPercentage > 25) return "dayum u lame 👎"
      return "girl, yaint got friends do u? 💀"
    };

    useEffect(() => {
        setInterval(() => setImageId([Math.floor(Math.random()*imageDb.length)]), 1000);
    }, []);


    return(
        <div className='global-centor'>
            <p><img src={imageDb[imageId]} className='wish-photo'/></p>
            <p>THANK YOU FOR PLAYING!!!</p>
            {!_.isNil(totalCorrectAnswer) && (
                <div>
                    <p>CORRECT ANSWERS: {totalCorrectAnswer-5} out of 16 ({getCorrectPercentage()})%</p>
                    <p>{getResultText()}</p>
                </div>
            )}
        </div>
    );
};

export default GameResult;