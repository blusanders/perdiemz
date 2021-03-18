import React from "react"
import { Link } from "react-router-dom"
import "./TourRun.css"
import { Button } from 'reactstrap';

export const TourRunCard = ({ tourRun }) => (
    <>
                        <div className="tourRunCard">

        <div className="tourRun__text tourRun__name">{tourRun.name} </div>
        <div className="tourRun__text">{tourRun.dateStart}-{tourRun.dateEnd}</div>
        <div>
            <Button className="btn-sm" href={`/tourrun/${tourRun.id}`}>
                PD
            </Button>
            </div>
            </div>
    </>
)