import React, { useContext, useState, createContext } from "react"
import { CrewContext } from "../crew/CrewProvider";

// The context is imported and used by individual components that need data
export const TourRunCrewContext = createContext()

// This component establishes what data can be used.
export const TourRunCrewProvider = (props) => {
    const { crew, getCrew } = useContext(CrewContext)

    const addTourRunCrew = tourRunId => {

        getCrew()
        .then(()=>{
            let crewTotalAvailable = crew.filter(crewMember => crewMember.available === true)
            debugger
            crewTotalAvailable.map(crewMember=>{
                let crewMemberObj = {
                    tourRunId: tourRunId,
                    crewId: crewMember.id
                }
                return fetch("http://localhost:8088/tourruncrew", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(crewMemberObj)
                })
                        
            })
        })

        // .then(getTourRunCrew)
    }

    const deleteTourRunCrew = tourRunId => {
        return fetch(`http://localhost:8088/tourruncrew/${tourRunId}`, {
            method: "DELETE"
        })
            // .then(getTourRunCrew)
    }

    return (    
        <TourRunCrewContext.Provider value={{
            addTourRunCrew, deleteTourRunCrew
        }}>
            {props.children}
        </TourRunCrewContext.Provider>
    )
}
