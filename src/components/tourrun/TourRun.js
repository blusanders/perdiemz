import React, { useContext, useEffect } from "react";
import "./TourRun.css"
import { TourRunForm } from "./TourRunForm";
import { TourRunList } from "./TourRunList";

export const TourRun = () => {

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
                
                <TourRunList />

        </div>
            <div className="container__tourRunMain">
                {/* Tour Run Form */}
                <TourRunForm />
            </div>
        </div>

    </div>
)
}