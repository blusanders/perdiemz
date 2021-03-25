import React, { useContext, useEffect } from "react";
import { ReportTourRun } from "./ReportTourRun";

export const Reports = () => {

    return (
        <div className="container__reports">

            <div className="containerHeader">
                <h1><i>Reportz</i></h1>
            </div>

            <div className="container__crewSideMain">

                <div className="container__crewSide">
                    <h2>Tour Runz by Tour</h2>
                </div>
            
                <div className="container__crewMain">

                <ReportTourRun />
                
                </div>
            </div>

        </div>
    )
}