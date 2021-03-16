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
                    {
                        crew.map(crewMember => {
                        return <CrewCard key={crew.id} crew={crewMember} />
                        })
                    }
                </div>
                <div className="container__crewMain">
                    <h2>Add/Edit Crew Member</h2>
                    <CrewForm />
                </div>
            </div>

        </div>
    )
}