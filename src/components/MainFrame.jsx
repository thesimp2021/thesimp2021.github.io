import React, {useState} from "react";
import {characterDatabase, itemsDatabase, purchaseTextDatabase} from '../database';
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
                              {(assets && assets.includes(item.id)) ? <span>✅</span> : <span>⭕</span>}{item.codeName}
                          </li>
                      );
                  })
              }
          </ul>
      </Card>
  );
};

const renderShopModal = (props) => {
    const {
        money,
        setMoney,
        assets,
        setAssets,
        purchaseText,
        setPurchaseText,
        isShopModalOpen,
        setShopModalOpen
    } = props;

    const handleBuyClick = (price, itemId) => {
        console.log(assets);
        setMoney(prevMoney => prevMoney - price);
        setAssets(prevAssets => [...prevAssets, itemId]);
        setPurchaseText(purchaseTextDatabase[itemId]);
    };

    return (
        <Modal
            show={isShopModalOpen}
            onHide={() => setShopModalOpen(false)}
            size='xl'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Shop
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
                                    <div>
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
                                    <div>
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

const MainFrame = (props) => {
    const playerName = _.get(props, 'location.state.playerName', '');
    const playerTitleId = _.get(props, 'location.state.playerTitleId', 0);

    const [isShopModalOpen, setShopModalOpen] = useState(false);
    const [purchaseText, setPurchaseText] = useState('');

    const [assets, setAssets] = useState([]);
    const [money, setMoney] = useState(8000);

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
                        <Button variant='primary' onClick={() => setShopModalOpen(true)}>
                            Open shop
                        </Button>
                        {renderShopModal(
                            {
                                money,
                                setMoney,
                                assets,
                                setAssets,
                                purchaseText,
                                setPurchaseText,
                                isShopModalOpen,
                                setShopModalOpen
                            }
                        )}
                    </Col>
                    <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10}>
                        kenape
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainFrame;
