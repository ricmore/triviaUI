import Teams from "./Teams";
import './app.css'
import {useEffect, useState} from "react";
import Question from "./Question";

let currentQuestionSetId = 0;

let teamsData = []

function App() {
    let [currentQuestion, setQuestion] = useState(null)
    let [currentQuestionOptions, setQuestionOptions] = useState([])
    let [teamsVisible, setTeamsVisible] = useState(true)
    let [currentTeam, setCurrentTeam] = useState(null)
    let [questionKey, setQuestionKey] = useState(0)
    let [currentTeamsData, setCurrentTeamsData] = useState(teamsData)
    let [teams, setTeams] = useState([])

    let fetchTeams = () => {
        fetch('http://localhost:8080/game/1/entries')
            .then(response => response.json())
            .then(data => setTeams(data));

    }

    let startTeamQuestionSet = (questionSetId, team) => {
        console.log(team)
        if (teamsData[team.id] == undefined) {
            teamsData[team.id] = {}
            teamsData[team.id].currentQuestion = 0;
            teamsData[team.id].correctAnswers = 0;
        }
        console.log(teamsData[team.id])
        setCurrentTeamsData(teamsData)
        currentQuestionSetId = questionSetId;
        setCurrentTeam(team);
        fetchFirstQuestion(team);
        setTeamsVisible(false);
    }

    let questionSetDone = (correctAnswer) => {
        if (correctAnswer) {
            teamsData[currentTeam.id].correctAnswers++;
        }
        setTeamsVisible(true);
        teamsData[currentTeam.id].done = true;
    }

    let fetchFirstQuestion = (team) => {
        fetchQuestion(team)
    }

    let fetchNextQuestion = (team, correctAnswer) => {
        console.log('Next question ' + correctAnswer)
        if (correctAnswer) {
            teamsData[team.id].correctAnswers++;
        }
        fetchQuestion(team)
    }

    let fetchQuestion = (team) => {
        teamsData[team.id].currentQuestion++;
        setQuestionKey(teamsData[team.id].currentQuestion)
        fetch(`http://localhost:8080/questionSet/${currentQuestionSetId}/question/${teamsData[team.id].currentQuestion}`)
            .then(response => response.json())
            .then(question => {
                setQuestion(question)
                fetch(`http://localhost:8080/question/${question.id}/options`)
                    .then(response => response.json())
                    .then(options => setQuestionOptions(options))
            })
    }

    useEffect(() => {
        fetchTeams()
    }, []);

    return (
        <div className='appContainer'>
            <Teams questionHandler={startTeamQuestionSet} visible={teamsVisible} data={currentTeamsData}
                   teams={teams}></Teams>
            <Question key={questionKey} question={currentQuestion} options={currentQuestionOptions} team={currentTeam}
                      visible={!teamsVisible} nextQuestion={fetchNextQuestion} questionSetDone={questionSetDone}></Question>
        </div>
    )
}

export default App;
