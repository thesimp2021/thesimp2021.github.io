import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {Progress, Button} from "reactstrap";
import simpLoadScreen from '../assets/images/simp-loading-image.png';
import {useHistory} from 'react-router-dom';

import _ from 'lodash';

const LoadingScreen = (props) => {
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const history = useHistory();

    const automateLoading = () => {
      if (loadingPercentage === 100) return;

       for (let i=0;i<20;i++) {
           setTimeout(() => {
               setLoadingPercentage(loadingPercentage+5);
           }, 500);
       }
    }

    const renderLoadingScreen = () => {
        automateLoading();

        return (
            <div className='global-centor' id='modified-centor-loading'>
                <img src={simpLoadScreen} id='the-simp-big'/>
                <Progress
                    animated
                    color='success'
                    value={loadingPercentage}
                    id='loading-bar'
                >{loadingPercentage}%</Progress>
                {!(loadingPercentage === 100) ?
                    <span id='loading-text'>Loading</span>
                    : <Button
                        color ='danger'
                        onClick={() => history.push({pathname: '/build', state: { isAuthorized: true }})}
                        size='sm'
                    >Start Game!</Button>
                }
            </div>
        );
    };

    return _.get(props, 'location.state.isAuthorized', false)
        ? renderLoadingScreen() : renderLoadingScreen();//<Redirect to='/' />;
};

export default LoadingScreen;