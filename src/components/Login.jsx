import React, {useState} from 'react';
import {Form, Input} from "antd";
import {useHistory} from 'react-router-dom';
import Typewriter from 'typewriter-effect';


const wrongPasswordTexts = [
  'try harder',
  'clue: chess player',
  'oh come on',
  'really?',
  'babe, foreal?',
  'sheesh',
  'is that all?',
  'u noob',
  'u love me or not?',
  'clue: hi-end fashun'
];
const nickNames = ['Muti', 'Girlfriend', '911','Hella','Bubu','Wifey','Fiancée','(my) World'];

const Login = () => {
    const [showWrongPassword, setShowWrongPassword] = useState(true);
    const [wrongPasswordText, setWrongPasswordText] = useState('clue: iqi\'s favorite fashun brand');
    const history = useHistory();

    const handlePasswordSubmit = ({ password }) => {
        return password === 'balenciaga' ?
            history.push({pathname: '/loading', state: { isAuthorized: true }})
            : setShowWrongPassword(() => {
                setWrongPasswordText(wrongPasswordTexts[Math.floor(Math.random() * 10)]);

                return true;
            });
    };

    return (
        <>
            <div className="global-centor">
                <h1>
                    <span className="login-typewriter">
                     Hello, <span id='transparent-underscores'>_</span>
                        <Typewriter
                            options={{
                                strings: nickNames,
                                autoStart: true,
                                loop: true,
                                pauseFor: 750,
                                changeDeleteSpeed: 400,
                            }}
                        />
                        !
                    </span>
                </h1>
            </div>
            <div className="global-centor" id='password-field'>
                <Form onFinish={handlePasswordSubmit}>
                    <Form.Item name='password' >
                        <Input.Password
                            visibilityToggle={false}
                            id='password-form'
                            placeholder='say the magic word' />
                    </Form.Item>
                </Form>
                {showWrongPassword && (<div id='wrong-password-text'><b>{wrongPasswordText}</b></div>)}
            </div>
        </>
    );
}

export default Login;