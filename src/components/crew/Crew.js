import React from "react";
import "./Crew.css"
import { CrewForm } from "./CrewForm";
import { CrewList } from "./CrewList";

export const Crew = () => {

    return (
        <div className="container__crew">

            <div className="containerHeader">
                <h1><i>Crew</i></h1>
            </div>

            <div className="container__crewSideMain">

                <div className="container__crewSide">
                    
                    <h2>All Crew</h2>
                    
                    <div className="crewCardHeader">
                        <div>Name</div>
                        <div>Title</div>
                        <div></div>
                    </div>

                    <CrewList />

                </div>

                <div className="container__crewMain">
                    <CrewForm />
                </div>

            </div>

        </div>
    )
}