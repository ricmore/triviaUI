import './question.css'
import Stopwatch from "./Stopwatch";
import {useState} from "react";

function Question(props) {
    let questionOwner = '';

    let [selectedOption, setSelectedOption] = useState(0)
    let [questionAnswered, setQuestionAnswered] = useState(false)
    let [questionCorrect, setQuestionCorrect] = useState(false)
    let [timerRunning, setTimerRunning] = useState(true)

    let selectOption = (order) => {
        if (!questionAnswered) {
            setSelectedOption(order)
        }
    }

    let validateResponse = () => {
        let correctOption = props.options.filter(option => option.correct === true)[0].order;
        setQuestionAnswered(true);
        setTimerRunning(false)
        console.log('Answer for ' + correctOption + ' ' + selectedOption)
        if (correctOption === selectedOption) {
            console.log('Answer is valid')
            setQuestionCorrect(true)
        } else {
            setQuestionCorrect(false)
        }
    }

    let timeOut = () => {
        console.log('TIMEOUT')
        if (!questionAnswered) {
            selectedOption = 0;
            setQuestionAnswered(true);
            setQuestionCorrect(false)
        }
    }


    let nextQuestion = () => {
        props.nextQuestion(props.team, questionCorrect)
    }

    let questionSetDone = () => {
        props.questionSetDone(questionCorrect)
    }

    if (props.question != null && props.team != null) {
        if (props.question.target === 'KID') {
            questionOwner = 'Aquesta pregunta es per ' + props.team.kid.name;
        } else if (props.question.target === 'ADULT') {
            questionOwner = 'Aquesta pregunta es per ' + props.team.adult.name;
        } else {
            questionOwner = "Aquesta pregunta es per als dos membres de l'equip ";
        }
    }
    if (props.visible && props.question != null) {
        const optionList = props.options.map((option, count) => {
            let className = '';
            if (!questionAnswered) {
                if (option.order === selectedOption) {
                    className = 'option selected';
                } else {
                    className = 'option notSelected';
                }
            } else {
                if (option.correct) {
                    className = 'option correct';
                } else {
                    if (option.order === selectedOption) {
                        className = 'option incorrect';
                    } else {
                        className = 'option notSelected';
                    }
                }
            }
            return <p className={className} onClick={() => selectOption(option.order)}>{option.text}</p>
        })

        let buttonBody = <p></p>;
        if (!questionAnswered) {
            buttonBody = <div className='buttonWrapper'>
                <div className='button answerButton' onClick={validateResponse}>Respondre</div>
            </div>
        } else {
            if (!props.question.last) {
                buttonBody = <div className='buttonWrapper'>
                    <div className='button' onClick={nextQuestion}>Següent pregunta</div>
                </div>
            } else {
                buttonBody = <div className='buttonWrapper'>
                    <div className='button' onClick={questionSetDone}>Tornar</div>
                </div>
            }
        }
        return (
            <div>
                <div className='questionWrapper'>
                    <p className='questionTarget'>{questionOwner}</p>
                    <div className='questionText'>{props.question.text}</div>
                </div>
                <div className='optionsWrapper'>
                    {optionList}
                </div>
                <Stopwatch minutes={0.5} enabled={timerRunning} timeOutHandler={timeOut}></Stopwatch>
                {buttonBody}
            </div>
        )
    } else {
        return null
    }
}

export default Question;
