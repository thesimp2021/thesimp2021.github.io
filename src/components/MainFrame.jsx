import React, {useState} from "react";
import {characterDatabase, itemsDatabase, levelsDatabase, purchaseTextDatabase} from '../database';
import {Container, Button, Row, Col, Card, Modal} from "react-bootstrap";
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
                              {(assets && assets.includes(item.id)) ? <span>✅ </span> : <span>⭕ </span>}{item.codeName}
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
    const [unlockedLevel, setUnlockedLevel] = useState(-1);
    const [isCurrentLevelAllAnswered, setIsCurrentLevelAllAnswered] = useState(false);
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

    //di final display, correct answers - 5 (soale ada bonus questions di tiap level)

    const renderShopModal = () => {
        const handleBuyClick = (price, itemId) => {
            setMoney(prevMoney => prevMoney - price);
            setAssets(prevAssets => [...prevAssets, itemId]);
            setPurchaseText(purchaseTextDatabase[itemId]);
            setUnlockedLevel(prevUnlockedLevel => prevUnlockedLevel+1);
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
                        Shop 🏪 {purchaseText !== '' && <span id='purchase-text'><b>"{purchaseText}"</b></span>}
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
        const renderFinishLevelButton = () => {
            return (
                <Button
                    onClick={
                        () => {
                            setIsQuizModalOpen(false);
                            setUnlockedLevel(unlockedLevel + 1);
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
                    Finish Level
                </Button>
            )
        };

        return
    }

    const renderIndidualLevel = (levelInfo,levelIndex) => {
        return (
            <Card bg='dark' text='white' className='level-cards'>
                <Card.Header>
                    <div className='city-names'><b>{levelInfo.cityName}</b></div>
                </Card.Header>
                <Card.Body>
                    <img src={levelInfo.imageUrl} className='level-photo'/>
                    <div className='level-buttons'>
                        <Button size='sm'>
                            ⓘ
                        </Button>
                        <Button
                            disabled={unlockedLevel !== levelIndex || isCurrentLevelAllAnswered}
                            onClick={() => setIsCurrentLevelAllAnswered(true)}
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
