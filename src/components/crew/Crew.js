import React, { useContext, useEffect } from "react";
import { CrewContext } from "./CrewProvider";
import { useHistory } from "react-router-dom";
import "./Crew.css"
import { CrewCard } from "./CrewCard";
import { CrewForm } from "./CrewForm";

export const Crew = () => {

    const { crew, getCrew } = useContext(CrewContext)

    useEffect(() => {
        getCrew()
    }, [])

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

                    {
                        crew.map(crewMember => {
                        return <CrewCard key={crew.id} crew={crewMember} />
                        })
                    }
            </div>
                <div className="container__crewMain">
                    <CrewForm />
                </div>
            </div>

        </div>
    )
}