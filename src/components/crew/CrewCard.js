import React from "react"
import { Link } from "react-router-dom"
import "./Crew.css"
import { Button } from 'reactstrap';

export const CrewCard = ({ crew }) => (
    <div className="crewCard">
        <div className="crew__text crew__name">{crew.firstName} {crew.lastName}</div>
        <div className="crew__text">{crew.title}</div>
        <div>
            <Button className="btn-sm" href={`/crew/details/${crew.id}`}>
                ...
            </Button>
        </div>
    </div>
)