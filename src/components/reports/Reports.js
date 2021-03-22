import React, { useContext, useEffect } from "react";
import { ReportTourRun } from "./ReportTourRun";

export const Reports = () => {

    return (
        <div className="container__crew">

            <div className="containerHeader">
                <h1><i>Reports</i></h1>
            </div>

            <div className="container__crewSideMain">
                <div className="container__crewSide">
                    <h2>Tour Runs by Tour</h2>
                </div>
                <div className="container__crewMain">

                <ReportTourRun />
                </div>
            </div>

        </div>
    )
}