import React, {useState} from "react";
import {characterDatabase, itemsDatabase, levelsDatabase, purchaseTextDatabase} from '../database';
import {Container, Button, Row, Col, Card, Modal, Stack} from "react-bootstrap";
import _ from "lodash";


const renderAssets = (assets) => {
  return (
      <Card body>
          <b>[Items 👜]</b>
          <ul id='asset-list' className='left-bar-separators'>
              {
                  itemsDatabase.map(item => {
                      return (
                          <li className='left-bar-separators'>
                              {(assets && assets.includes(item.id)) ? <span>✅ </span> : <span>❌ </span>}{item.codeName}
                          </li>
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

    const [isShopModalOpen, setShopModalOpen] = useState(false);
    const [purchaseText, setPurchaseText] = useState('');

    const [assets, setAssets] = useState([]);
    const [money, setMoney] = useState(1000);

    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [hasBoughtTicket, setHasBoughtTicket] = useState(false);
    const [isCurrentLevelAllAnswered, setIsCurrentLevelAllAnswered] = useState(false);
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
    const [correctAnswerText, setCorrectAnswerText] = useState('');
    const [isAnswerShown, setIsAnswerShown] = useState({
        0: true,
        1: true,
        2: true,
        3: true
    });
    //di final display, correct answers - 5 (soale ada bonus questions di tiap level)


    const [isCityInfoModalOpen, setIsCityInfoModalOpen] = useState(false);
    const [selectedCityInfoId, setSelectedCityInfoId] = useState(0);

    const renderShopModal = () => {
        const handleBuyClick = (price, itemId) => {
            setMoney(prevMoney => prevMoney - price);
            setAssets(prevAssets => [...prevAssets, itemId]);
            setPurchaseText(purchaseTextDatabase[itemId]);
            setHasBoughtTicket(true);
            setSelectedLevel(selectedLevel === 0 && !isCurrentLevelAllAnswered ? selectedLevel : selectedLevel+1);
            setIsCurrentLevelAllAnswered(false);
        };

        return (
            <Modal
                show={isShopModalOpen}
                onHide={() => {
                    setPurchaseText('');
                    setShopModalOpen(false);
                }}
                size='xl'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Shop 🏪 {purchaseText !== '' && <span id='purchase-text'><b> | "{purchaseText}"</b></span>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='item-list'>
                        {itemsDatabase.filter(item => item.id === 0 || item.id === 1 || item.id === 2).map(item => {
                            const isDisabled = assets.includes(item.id) || money < item.price;

                            return (
                                <Card className='item-card'>
                                    <Card.Header>{item.name} ${item.price}</Card.Header>
                                    <Card.Body>
                                        <img className='item-photo' src={item.imageUrl} />
                                        <div id='purchase-action-button'>
                                            <Button
                                                disabled={isDisabled}
                                                variant='success'
                                                onClick={() => handleBuyClick(item.price, item.id)}
                                                size='sm'
                                            >
                                                purchase item
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                    <div className='item-list'>
                        {itemsDatabase.filter(item => item.id === 3 || item.id === 4).map(item => {
                            const isDisabled = assets.includes(item.id) || money < item.price;

                            return (
                                <Card className='item-card'>
                                    <Card.Header>{item.name} ${item.price}</Card.Header>
                                    <Card.Body>
                                        <img className='item-photo' src={item.imageUrl} />
                                        <div id='purchase-action-button'>
                                            <Button
                                                disabled={isDisabled}
                                                variant='success'
                                                onClick={() => handleBuyClick(item.price, item.id)}
                                                size='sm'
                                            >
                                                purchase item
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    const renderQuizModal = () => {
        const renderSubmitFinalLevelButton = () => {
            return (
                <Button
                    onClick={
                        () => {
                            setIsQuizModalOpen(false);
                            setIsCurrentQuestionAnswered(false);
                            setCurrentQuestionId(0);
                            setIsCurrentLevelAllAnswered(true);
                        }
                    }
                >
                    Submit Final Level
                </Button>
            );
        }

        const renderFinishLevelButton = () => {
            return (
                <Button
                    variant='warning'
                    onClick={
                        () => {
                            setIsQuizModalOpen(false);
                            setIsCurrentQuestionAnswered(false);
                            setCurrentQuestionId(0);
                            setIsCurrentLevelAllAnswered(true);
                        }
                    }
                >
                    Finish Level
                </Button>
            )
        };

        const handleAnswerClick = (index, correctAnswerId, questionOptions) => {
            const isCorrect = currentQuestionId === 4 ? true : (index === correctAnswerId);
            const selectedAnswer = `selected answer: ${questionOptions[index]} <-> `;
            console.log (isCorrect);
            setTotalCorrectAnswers(isCorrect ? totalCorrectAnswers+1 : totalCorrectAnswers);
            setCorrectAnswerText(isCorrect ?
                `${selectedAnswer} 🟢 correct answer: ${questionOptions[correctAnswerId]}` :
                `${selectedAnswer} 🔴 correct answer: ${questionOptions[correctAnswerId]}`
            )
            setIsCurrentQuestionAnswered(true);
            setMoney(isCorrect ?
                currentQuestionId === 4 ?
                    money + (itemsDatabase[selectedLevel+1].price - money) //logic salah
                    : money + levelsDatabase[selectedLevel].rewardPerQuestion
                : money)
        }
        //BUAT HANDLE ANSWERL CLICK FINAL LEVEL BIAR GA ITEM DATABASE INDEX OUT OF BOUND

        const renderNextQuestionButton = () => {
            return (
                <Button
                    onClick={() => {
                        setIsCurrentQuestionAnswered(false);
                        setCurrentQuestionId(currentQuestionId+1);
                    }}
                >
                    Next Question
                </Button>
            )
        };

        const {
            authorName,
            authorCoolName,
            questionText,
            wish,
            questionOptions,
            correctAnswerId,
            imageUrl
        } = levelsDatabase[selectedLevel].quizzes[currentQuestionId];

        if (selectedLevel !== 4) {
            return (
                <Modal
                    show={isQuizModalOpen}
                    onHide={() => setIsQuizModalOpen(false)}
                    size='xl'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body
                        className='bg-transparent'
                    >
                        <div className='quiz-modal'>
                            <Stack gap={3}>
                                <div>
                                    <Stack direction='horizontal' gap={3}>
                                        {!_.isNil(imageUrl)
                                        && <div className='quiz-modal-separator'><img src={imageUrl} className='wish-photo'/>
                                        </div>
                                        }
                                        <div className='quiz-modal-separator city-info-body'><b>{authorCoolName}</b> 💬 says {wish}</div>
                                    </Stack>
                                </div>
                                <div className='question-section'>
                                    <div className='quiz-modal-separator  city-info-body text-center'>
                                        "{questionText}" - <b>{authorName} 🤔</b>
                                    </div>
                                    <div className='quiz-modal-separator question-mapper'>
                                        {isCurrentQuestionAnswered ? correctAnswerText :
                                            questionOptions.map((option, index) => (
                                                <Card
                                                    className='quiz-modal-separator bg-dark padder'
                                                    onClick={() => handleAnswerClick(index, correctAnswerId, questionOptions)}
                                                >
                                                    {option}
                                                </Card>
                                            ))}
                                    </div>
                                    <div className='quiz-modal-separator text-kanan'>
                                        {isCurrentQuestionAnswered && (selectedLevel === 4 ? renderSubmitFinalLevelButton() :
                                            (currentQuestionId === 4 ? renderFinishLevelButton() : renderNextQuestionButton()))}
                                    </div>
                                </div>
                            </Stack>
                        </div>
                    </Modal.Body>
                </Modal>
            );
        }

        return (
            <Modal
                show={isQuizModalOpen}
                onHide={() => setIsQuizModalOpen(false)}
                size='xl'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body
                    className='bg-transparent'
                >
                    <div className='quiz-modal'>
                        <Stack gap={3}>
                            <div>
                                <Stack direction='horizontal' gap={3}>
                                    {!_.isNil(imageUrl)
                                    && <div className='quiz-modal-separator'><img src={imageUrl} className='wish-photo'/>
                                    </div>
                                    }
                                    <div className='quiz-modal-separator city-info-body'><b>{authorCoolName}</b> 💬 says {wish}</div>
                                </Stack>
                            </div>
                            <div className='question-section'>
                                <div className='quiz-modal-separator  city-info-body text-center'>
                                    "{questionText}" - <b>{authorName} 🤔</b>
                                </div>
                                <div className='quiz-modal-separator question-mapper'>
                                    {isCurrentQuestionAnswered ? correctAnswerText :
                                        questionOptions.map((option, index) => {
                                            return isAnswerShown[index] && (
                                                <Card
                                                    onMouseEnter={() => setIsAnswerShown(prevState => ({
                                                        ...prevState,
                                                        [index]: index === 2,
                                                    }))}
                                                    className='quiz-modal-separator bg-dark padder'
                                                    onClick={() => handleAnswerClick(index, correctAnswerId, questionOptions)}
                                                >
                                                    {option}
                                                </Card>
                                            );
                                        })}
                                </div>
                                <div className='quiz-modal-separator text-kanan'>
                                    {isCurrentQuestionAnswered && renderSubmitFinalLevelButton()}
                                </div>
                            </div>
                        </Stack>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    const renderCityInfoModal = () => {
        return (
          <Modal
              show={isCityInfoModalOpen}
              onHide={() => setIsCityInfoModalOpen(false)}
              size='xl'
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
              <Modal.Header className='city-title' closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      <b>CITY INFO - <u>{levelsDatabase[selectedCityInfoId].cityName}</u></b>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className='city-info-body'>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;{levelsDatabase[selectedCityInfoId].description}</p>
                      <p>{levelsDatabase[selectedCityInfoId].requiredItemDesc}</p>
                      <p className='required-item-text'><b>🔓 Required item</b>: {itemsDatabase[selectedCityInfoId].codeName}</p>
                      <p className='required-item-text'><b>💵 Reward per-question</b>: ${levelsDatabase[selectedCityInfoId].rewardPerQuestion}</p>
                  </div>
              </Modal.Body>
          </Modal>
        );
    }

    const renderIndidualLevel = (levelInfo,levelIndex) => {
        return (
            <Card bg='dark' text='white' className='level-cards'>
                <Card.Header >
                    <div className='city-names'><b>{`< ${levelInfo.cityName} >`}</b></div>
                </Card.Header>
                <Card.Body>
                    <img src={levelInfo.imageUrl} className='level-photo'/>
                    <div className='level-buttons'>
                        <Button
                            onClick={() => {
                                setSelectedCityInfoId(levelIndex);
                                setIsCityInfoModalOpen(true);
                            }}
                            size='sm'
                        >
                            🔎
                        </Button>
                        <Button
                            disabled={!hasBoughtTicket || selectedLevel !== levelIndex || isCurrentLevelAllAnswered}
                            onClick={() => setIsQuizModalOpen(true)}
                            size='sm'
                            variant='danger'
                        >
                            hayuk atuh!
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col className='left-bar' lg={2} md={2} sm={2} xl={2} xs={2} xxl={2}>
                        <div className='left-bar-separators'>
                            <b>Hello, {playerName}!</b>
                        </div>
                        <img className='left-bar-separators' src={characterDatabase[playerTitleId].imageUrl} id='character-photo'/>
                        <div className='left-bar-separators' id='player-title-text'>
                            <b><u>"{characterDatabase[playerTitleId].title}"</u></b>
                        </div>
                        <div className='left-bar-separators' id='money-text'>
                            <b>💸${money}</b>
                        </div>
                        {renderAssets(assets)}
                        <div className='shopping-cart-image'>🛒</div>
                        <div className='left-bar-separators' id='shop-button'>
                            <Button variant='success' size='sm' onClick={() => setShopModalOpen(true)}>
                                JAJAN ATUH!
                            </Button>
                        </div>
                        {renderShopModal()}
                        {renderCityInfoModal()}
                        {renderQuizModal()}
                    </Col>
                    <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10}>
                        <Row>
                            <div className='level-list'>
                                {levelsDatabase.map(
                                    (individualLevel, index) => renderIndidualLevel(individualLevel, index)
                                )}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainFrame;
