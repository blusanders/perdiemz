import React from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Tour.css"
import { Button } from 'reactstrap';

export const TourCard = ({ tour }) => {
    const history = useHistory()

    const routeChange = () =>{ 
        let path = history.push(`/tour/${tour.id}`) 
        history.push(path);
    }
    
    return (
        <>
        <div className="tourCard">
            <div className="tour__text tour__name">{tour.name}</div>
            <div className="tour__text">{tour.dateStart}</div>
            <div className="tour__text">{tour.dateEnd}...</div>
            <div>   
    
                {/* <Link to={`/tour/${tour.id}`} className="btn btn-primary">...</Link> */}
                <Button type="button" className="btn-sm" href={`/tour/${tour.id}`}>
                    ...
                </Button>
            </div>
        </div>
        </>
    )
}
