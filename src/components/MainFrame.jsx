import React, {useState} from "react";
import {characterDatabase, questionsDatabase, itemsDatabase} from '../database';
import {Container, Button, Row, Col, Card} from "react-bootstrap";
import _ from "lodash";


const renderAssets = (assets) => {
  return (
      <Card body>
          [Assets]
          <ul id='asset-list'>
              {
                  itemsDatabase.map(item => {
                      return assets.includes(item.id) && (
                          <li>{item.codeName}</li>
                      );
                  })
              }
          </ul>
      </Card>
  );
};

const MainFrame = (props) => {
    const playerName = _.get(props, 'location.state.playerName', '');
    const playerTitleId = _.get(props, 'location.state.playerTitleId', 0);

    const [unlockedLevels, setUnlockedLevels] = useState(1);
    const [bonusQuestion, setBonusQuestions] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState(questionsDatabase[1]);

    const [assets, setAssets] = useState([0, 1, 2, 3, 4]);
    const [money, setMoney] = useState(5000);


    const existingLevels = [1, 2, 3, 4, 5];

    const handleBonusQuestion = () => {
        setBonusQuestions(bonusQuestion + 1);
        return {author: "iqi ganteng"};
    }

    const incrementCount = () => {
        setUnlockedLevels(unlockedLevels + 1);
        setSelectedQuestion(() => {
            const balikan = questionsDatabase.find(question2 => question2.id === unlockedLevels + 1);

            return balikan || handleBonusQuestion();
        });
        // setSelectedQuestion(selectedQuestion+1);
    };

    const RenderLevel = ({unlockedLevels, currentLevel, handleLevelUp}) => {
        return (
            unlockedLevels > currentLevel - 1 &&
            <div>
                bacot {currentLevel}
                <button onClick={handleLevelUp}>+</button>
            </div>
        );
    }

    const RenderQuestion = ({question}) => {
        return (
            <div>{question.author}</div>
        );
    }

    const renderRame = () => {
        return (
            <div>
                <span>bonus level: {bonusQuestion}<br></br></span>
                <span>current level: {unlockedLevels}</span>
                {
                    existingLevels.map(level =>
                        <RenderLevel
                            unlockedLevels={unlockedLevels}
                            currentLevel={level}
                            handleLevelUp={incrementCount}
                        />
                    )
                }
                <RenderQuestion question={selectedQuestion}/>
            </div>
        );
    };

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col className='left-bar' lg={2} md={2} sm={2} xl={2} xs={2} xxl={2}>
                        <div className='left-bar-separators'>
                            <b>Hello, {playerName}!</b>
                        </div>
                        <img className='left-bar-separators' cl src={characterDatabase[playerTitleId].imageUrl} id='character-photo'/>
                        <div className='left-bar-separators' id='player-title-text'>
                            <b><u>"{characterDatabase[playerTitleId].title}"</u></b>
                        </div>
                        <div className='left-bar-separators' id='money-text'>
                            <b>💸${money}</b>a
                        </div>
                        {renderAssets(assets)}
                    </Col>
                    <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10}>
                        {renderRame()}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainFrame;
