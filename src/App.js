import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoadingScreen from './components/LoadingScreen'
import MainFrame from "./components/MainFrame";
import CreateCharacter from "./components/CreateCharacter";
import Login from "./components/Login";
import './App.css';

function App () {
    return (
        <div className='Global'>
            <Router>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/loading' render={(props) => <LoadingScreen {...props}/>} />
                    <Route path='/build' component={(props) => <CreateCharacter {...props} />} />
                    <Route path='/play' component={(props) => <MainFrame {...props} />} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
