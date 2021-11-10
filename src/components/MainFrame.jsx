import React, {useState} from "react";
import {characterDatabase, itemsDatabase, levelsDatabase, purchaseTextDatabase} from '../database';
import {Container, Button, Row, Col, Card, Modal, Stack} from "react-bootstrap";
import _ from "lodash";
import {useHistory} from 'react-router-dom';



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
    const history = useHistory();

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
                    variant='danger'
                    onClick={
                        () => {
                            setIsQuizModalOpen(false);
                            setIsCurrentQuestionAnswered(false);
                            setCurrentQuestionId(0);
                            setIsCurrentLevelAllAnswered(true);
                            return history.push({
                                pathname: '/thank-you',
                                state: {correct: totalCorrectAnswers}
                            });
                        }
                    }
                >
                    Finish Game!
                </Button>
            );
        };

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
            console.log({totalCorrectAnswers});
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
                                        {isCurrentQuestionAnswered
                                            && (currentQuestionId === 4 ? renderFinishLevelButton() : renderNextQuestionButton())}
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
                    <div className='final-quiz-modal'>
                        <Stack gap={3}>
                            <div>
                                <Stack direction='horizontal' gap={3}>
                                    <div className='quiz-modal-separator city-info-body' style={{'font-size':'2vh'}}>
                                        <p style={{'text-align': 'center', 'padding-bottom': '2vh'}}><img src={imageUrl} className='wish-photo'/></p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Hi Girlfriend!!!! I bet you still be pissed cz of the prank that mae & i pulled up (ya semoga kejadian si pranknya hehe). I know that today isn't the exact date of your birthday (this time around i remember tho lmao 😏) but I really want to say "Happy Birthday sayang!" in person. Hugging you tight and seeing that beautiful smile on your face would always melt me. As much as it was hard for you to find the perfect gift for my birthday, same goes to finding one for yours. But then I asked myself, "what's her favorite escape mechanism". I started with movies/tv series, but idk what i shud do widdit. What about music? goddamn, ive got a lame voice. Doesn't she like working out? Should i buy her shoez? no way, the only thing werkin out in her life is this relationship lmao (jk). Then it finally hit me... THE SIMS BRO, MAYBE I COULD MAKE MY OWN VERSION OF IT!!!! My brain got stormed by tons of ideas, how the design would look like, the storyline, the characters, the features, etc.</p>

                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;When you introduced me to the sims, I was astonished at how far the gaming technology has advanced. How you can make the exact replica of our faces is just surreal. Not only you can alter the physical look of your Sim, but even the entire environment that their reside in. Things like career storyline, unique interaction with other characters, costumes, individual characteristics, even all the way to how their furnitures are placed with extreme precision (this attention to so much detail amazed me). I know my version of the game would not come even close to compete with the actual Sims Game, they have an entire office department to develop that. But I vision The Simps 2021 can somewhat emulates the things that you have/or will experience in life. You told me that you like to escape boring 9-5 life and just become whoever that you wanna be in The Sims. So I told myself "might as well we put it all together, a game where she can escape to, but still be reminded how beautiful her life is".</p>

                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Being 19 might be the roughest time in your life. Shitty breakups, your loved ones passing away, some unmet debating expectations, major conflict with your family/debating community, not to mention adulting life is about to hit you like a truck. A lot of times you told me how people would look at you in a negative way just because you take action on a certain thing (e.g. pulling out from community). But baby, I hope this game proves you otherwise. People would always see the good as long as you treat them nicely (in which I'm sure you always do). Seeing people around you sending me these warm birthday wishes put a big smile on my face. I knew that I was right when I say "babe, people that are aholes, are just aholes. it doesnt matter what you do to them, they'd be an ass anyway. Don't mind them too much aight". On the other hand, while those h8ers kept on h8ing u, u be smashin tonzzzz of debating tourneys. Bagging bunch of open champion titles, national-finalist, and not to mention all the acoring gigs that you got. All of that while still be having awesome grades, mawapres finals, and enrolled in bilsa? dayum gurl, proud would be an understatement! 😍 . So, I wish you the happiest birthday sayang. I wish you a healthier, wealthier, and wiser life ahead. May all of your hardwork make your big dreams comes to life. You have worked hard since you're in Semarang, Bangkok, and soon Belgrade & Jakarta. Altho I cant take you around the globe as your birthday presence, I hope this game can. I love you so much! Keep doing what you love, u doing great! Heck, you kick ass!!!!</p>

                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;I had a lot of fun developing this game. This is how my perfect future would look like, no-apps installed, just a pure website that does all the heavylifting. As you know, I really hate front-end programming (i succ at aesthetix), but sure as hell I'd be lying if I say that I'm not entertained when using the latest frontend technology (React). Sayang, I know that I'm bad at expressing things through words. So I decided to write you a love letter. It consists of 1000+ lines of code, written in Javascript (the only thing that I'd worship other than god, and my gf lmao), presented in a nice, minimalistic way, but still maintain that hypermodern/bleeding edge kind of look. This is my love letter to you, bubu. 💝</p>
                                        <p>Yours, truly 💌 <b>{authorCoolName}</b></p>
                                    </div>
                                </Stack>
                            </div>
                            <div className='question-section'>
                                <div className='quiz-modal-separator  city-info-body text-center'>
                                    "{questionText}" - <b>{authorName} 🤔</b>
                                </div>
                                <div className='quiz-modal-separator question-mapper'>
                                    {isCurrentQuestionAnswered ? correctAnswerText :
                                        questionOptions.map((option, index) => {
                                            return (
                                                <Card
                                                    style={isAnswerShown[index] ? {  padding: '2vh',
                                                        background: 'black',
                                                        color: 'white',
                                                        cursor: 'pointer'} : {
                                                        background: 'forestgreen',
                                                        padding: '2vh',
                                                        color: 'forestgreen',
                                                        border: 'transparent'
                                                    }}
                                                    onMouseEnter={() => setIsAnswerShown(prevState => {
                                                        if (index === 2) {
                                                            return {...prevState, 2: true}
                                                        }

                                                        return {...prevState, [index]: false}
                                                    })}
                                                    onMouseLeave={() => setIsAnswerShown(prevState => {
                                                        return {...prevState, [index]: true}
                                                    })}
                                                    className='quiz-modal-separator' //bg-dark padder
                                                    onClick={() => {
                                                        if (index === 2) return handleAnswerClick(index, correctAnswerId, questionOptions)

                                                        return
                                                    }}
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
