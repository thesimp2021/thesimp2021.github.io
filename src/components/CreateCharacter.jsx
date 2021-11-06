import React, {useState} from 'react';
import {Input} from 'antd';
import {Dropdown, Button} from "react-bootstrap";
import _ from "lodash";
import {characterDatabase} from '../database'
import {useHistory} from "react-router-dom";

const CreateCharacter = (props) => {
    const [playerName, setPlayerName] = useState('');
    const [playerTitleId, setPlayerTitleId] = useState(-1);
    const history = useHistory();


    const handlePlayGame = () => {
        history.push({
            pathname: '/play',
            state: {
                isAuthorized: true,
                playerName,
                playerTitleId
            }
        })
    };

    const renderBuildCharacterScreen = () => {
        return (
            <div className='global-centor'>
                <div>
                    {(playerTitleId !== -1) && <img src={characterDatabase[playerTitleId].imageUrl} className='enter-username'  id='character-selection'/>}
                </div>
                <div className='input-boxes-character'>
                    <Dropdown className='d-inline-mx-2' onSelect={(key,object) => setPlayerTitleId(key)}>
                        <Dropdown.Toggle id='dropdown-auto-close-true' variant='success'>
                            {playerTitleId === -1 ? 'Choose your character\'s title' : characterDatabase[playerTitleId].title}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {characterDatabase.map(characterInfo => (
                                <Dropdown.Item eventKey={characterInfo.id}>
                                    {characterInfo.title}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Input
                        className='enter-username'
                        placeholder='enter username'
                        onChange={(event) => setPlayerName(event.target.value)}
                    />
                    <div>
                        {(playerName !== '' && playerTitleId !== -1)
                            && <Button variant='danger' onClick={handlePlayGame}>Let's play!</Button>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return _.get(props, 'location.state.isAuthorized', false)
        ? renderBuildCharacterScreen() : renderBuildCharacterScreen();//<Redirect to='/' />;
};

export default CreateCharacter;