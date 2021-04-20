import React, { useContext, useState, createContext } from "react"
import { CrewContext } from "../crew/CrewProvider";

// The context is imported and used by individual components that need data
export const TourRunCrewContext = createContext()

// This component establishes what data can be used.
export const TourRunCrewProvider = (props) => {
    const { tourRunCrew, setTourRunCrew } = useContext(CrewContext)
    const [tourRunCrewByTourRunId, setTourRunCrewByTourRunId] = useState([])

    const getTourRunCrew = (tourRunId) => {
        return fetch("http://localhost:8088/tourruncrew?/"+tourRunId)
        .then(res => res.json())
        .then(setTourRunCrew)
    }

    const getTourRunCrewByTourRunId = (tourRunId) => {
        // debugger
        let fetchURL =`http://localhost:8088/tourruns/?tourRunId=${tourRunId}` 
        return fetch(fetchURL)
            .then(res => res.json())
            .then(setTourRunCrewByTourRunId)
    }
    
    const getCrewByTourRunId = (crewId) => {
        return fetch(`http://localhost:8088/tourRuncrew/${crewId}`)
            .then(res => res.json())
    }

    const addTourRunCrew = crewMemberObj => {

                return fetch("http://localhost:8088/tourruncrew", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(crewMemberObj)
                })
    }

    const deleteTourRunCrew = tourRunId => {
        return fetch(`http://localhost:8088/tourruncrew/?tourRunId=${tourRunId}`, {
            method: "DELETE"
        })
            .then(getTourRunCrew)
    }

    return (    
        <TourRunCrewContext.Provider value={{
            tourRunCrew, setTourRunCrew, addTourRunCrew, deleteTourRunCrew, tourRunCrewByTourRunId, setTourRunCrewByTourRunId, getCrewByTourRunId
        }}>
            {props.children}
        </TourRunCrewContext.Provider>
    )
}
