import React from "react"
import { useHistory } from "react-router-dom"
import "./TourRun.css"
import { Button } from 'reactstrap';

export const TourRunCard = ({ tourRun }) => {
    const history = useHistory()

    const routeChange = () =>{ 
        history.push(`/tourrun/${tourRun.id}`) 
    }

return(

<div className="tourRunCard">

        <div className="tourRun__text tourRun__name">{tourRun.name} </div>
        <div className="tourRun__text">{tourRun.dateStart}-{tourRun.dateEnd}</div>
        <div className="tourRun__text tourRun__name">{tourRun.tour.name.substring(0,8)} </div>
        <div>
            <Button className="btn-sm" onClick={routeChange}>
                ...
            </Button>
        </div>
    </div>
    )
}