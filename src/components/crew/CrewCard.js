import React from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Crew.css"
import { Button } from 'reactstrap';

export const CrewCard = ({ crew }) => {
    const history = useHistory()

    const routeChange = () =>{ 
        history.push(`/crew/${crew.id}`) 
    }
    
    //change background color if unavailable
    let availVar
    crew.available ? availVar = "crewCard" : availVar = "crewCard crewCardAlt"

    return (
        <>
        <div className={availVar}>
            <div className="crew__text crew__name">{crew.lastName}, {crew.firstName}</div>
            <div className="crew__text">{crew.title}</div>
            <div className="crew__text">{crew.crewType.name.substring(0,4)}...</div>
            <div>   
    
                {/* <Link to={`/crew/${crew.id}`} className="btn btn-primary">...</Link> */}
                <Button type="button" className="btn-sm" onClick={routeChange}>
                    ...
                </Button>
            </div>
        </div>
        </>
    )
}
