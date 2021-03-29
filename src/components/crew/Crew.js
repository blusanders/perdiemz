import React, { useState, useContext, useEffect }  from "react";
import "./Crew.css"
import { CrewForm } from "./CrewForm";
import { CrewList } from "./CrewList";
import { CrewContext } from "./CrewProvider";

export const Crew = () => {

    const { crew, getCrew } = useContext(CrewContext)
    const [crewTotalAvailable, setCrewTotalAvailable ] = useState(0)

    useEffect(() => {
        getCrew()
    }, [])

    useEffect(()=>{
        setCrewTotalAvailable(crew.filter(crewMember => crewMember.available === true).length)
    },[crew])

    return (
        <div className="container__crew">

            <div className="containerHeader">
                <h1><i>Crewz</i></h1>
            </div>

            <div className="container__crewSideMain">

                <div className="container__crewSide">
                    
                    <h2>All Crewz ({crewTotalAvailable} avail)</h2>
                    
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