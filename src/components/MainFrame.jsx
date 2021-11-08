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
    const [money, setMoney] = useState(50000);

    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [hasBoughtTicket, setHasBoughtTicket] = useState(false);
    const [isCurrentLevelAllAnswered, setIsCurrentLevelAllAnswered] = useState(false);
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
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
            id,
            authorName,
            authorCoolName,
            questionText,
            wish,
            questionOptions,
            correctAnswerId,
            imageUrl
        } = levelsDatabase[selectedLevel].quizzes[currentQuestionId];

        return (
            <Modal
                show={isQuizModalOpen}
                onHide={() => setIsQuizModalOpen(false)}
                size='xl'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    {authorName} - {authorCoolName}
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>
                        <div>
                            Pala atas
                            <Stack direction='horizontal' gap={3}>
                                {!_.isNil(imageUrl)
                                && <div><img src={imageUrl} className='wish-photo'/>
                                </div>
                                }
                                <div>{wish}</div>
                            </Stack>
                        </div>
                        <div>pala bawah{selectedLevel === 4 ? renderSubmitFinalLevelButton() :
                            (currentQuestionId === 3 ? renderFinishLevelButton() : renderNextQuestionButton())
                        }</div>
                    </Stack>
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
                            ⓘ
                        </Button>
                        <Button
                            disabled={!hasBoughtTicket || selectedLevel !== levelIndex || isCurrentLevelAllAnswered}
                            //selectedLevel !== levelIndex || unlockedLevel !== levelIndex || isCurrentLevelAllAnswered
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
