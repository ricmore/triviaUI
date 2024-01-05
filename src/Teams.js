import {useEffect, useState} from "react";
import './teams.css'

function Teams(props) {

    let [teams, setTeams] = useState(<p></p>)

    let getQuestion = (questionSetId, team) => {
        props.questionHandler(questionSetId, team)
    }

    const teamsList = props.teams.map((entry, count) => {
            const team = entry.team;
            let adultName = team.adult.name;
            let kidName = team.kid.name;
            if (props.data[team.id] == undefined) {
                return <div className='teamContainer'>
                    <p className='teamNameActive'
                       onClick={() => getQuestion(entry.questionSetId, team)}>{kidName} - {adultName}</p>
                </div>
            } else {
                return <div className='teamContainer'>
                    <p className='teamNameDone'>{kidName} - {adultName}: {props.data[team.id].correctAnswers}</p>
                </div>
            }
        }
    );

    if (props.visible) {
        return (
            <div className='teamsContainer'>
                <div className='teamsTitle'>Els equips</div>
                {teamsList}
            </div>
        )
    } else {
        return null
    }
}

export default Teams;
