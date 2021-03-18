import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TourRunCard } from "./TourRunCard";
import { TourRunContext } from "./TourRunProvider";

export const TourRun = () => {

    const { tourRuns, getTourRuns } = useContext(TourRunContext)

    useEffect(() => {
        getTourRuns()
    }, [])

        return (
        <div className="container__tourRun">

        <div className="containerHeader">
            <h1><i>Tour Runs</i></h1>
        </div>

        <div className="container__tourRunSideMain">
            <div className="container__tourRunSide">
                <h2>All Tour Runs</h2>
                <div className="tourRunCardHeader">
                    <div>Name</div>
                    <div>Date</div>
                    <div></div>
                </div>

                {
                    tourRuns.map(tourRun => {
                    return <TourRunCard key={tourRun.id} tourRun={tourRun} />
                    })
                }
        </div>
            <div className="container__tourRunMain">
Tour Run Form
            </div>
        </div>

    </div>
)
}