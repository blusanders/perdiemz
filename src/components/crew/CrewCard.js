import React from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Crew.css"
import { Button } from 'reactstrap';

export const CrewCard = ({ crew }) => {
    const history = useHistory()

    const routeChange = () =>{ 
        let path = history.push(`/crew/${crew.id}`) 
        history.push(path);
    }
    
    return (
        <div className="crewCard">
            <div className="crew__text crew__name">{crew.lastName}, {crew.firstName}</div>
            <div className="crew__text">{crew.title}</div>
            <div>   
    
                {/* <Link to={`/crew/${crew.id}`} className="btn btn-primary">...</Link> */}
                <Button type="button" className="btn-sm" href={`/crew/${crew.id}`}>
                    ...
                </Button>
            </div>
        </div>
    )
}
