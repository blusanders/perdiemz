import React, { useState, useContext, useEffect }  from "react";
import "./Crew.css"
import { CrewForm } from "./CrewForm";
import { CrewList } from "./CrewList";
import { CrewContext } from "./CrewProvider";

export const Crew = () => {

    const { crew, getCrew } = useContext(CrewContext)
    // const [crewTotalAvailable, getCrewAvailable ] = useState()
    const [crewTotalAvailable, setCrewTotalAvailable ] = useState()

    useEffect(() => {
        getCrew()
    }, [])

    let crewTotalAvailableVar = crew.filter(crewMember => crewMember.available === true).length

    return (
        <div className="container__crew">

            <div className="containerHeader">
                <h1><i>Crew</i></h1>
            </div>

            <div className="container__crewSideMain">

                <div className="container__crewSide">
                    
                    <h2>All Crewz ({crewTotalAvailableVar} avail)</h2>
                    
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