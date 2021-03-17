import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CrewContext = createContext()

// This component establishes what data can be used.
export const CrewProvider = (props) => {
    const [crew, setCrew] = useState([])

    const getCrew = () => {
        return fetch("http://localhost:8088/crew?_expand=crewTypeId")
        .then(res => res.json())
        .then(sorted => {
            sorted = sorted.sort((a,b)=>a.lName-b.lName) //change a,b to sort most recent last
            setCrew(sorted)
        })
    }

    const getCrewById = (id) => {
        return fetch(`http://localhost:8088/crew/${id}`)
            .then(res => res.json())
    }

    const addCrew = crewObj => {
        return fetch("http://localhost:8088/crew", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crewObj)
        })
        .then(getCrew)
    }

    const deleteCrew = crewId => {
        return fetch(`http://localhost:8088/crew/${crewId}`, {
            method: "DELETE"
        })
            .then(getCrew)
    }

    return (
        <CrewContext.Provider value={{
            crew, getCrew, getCrewById, addCrew, deleteCrew
        }}>
            {props.children}
        </CrewContext.Provider>
    )
}
