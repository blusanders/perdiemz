import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CrewTypeContext = createContext()

// This component establishes what data can be used.
export const CrewTypeProvider = (props) => {
    const [crewType, setCrewType] = useState([])

    const getCrewType = () => {
        return fetch("http://localhost:8088/crewType")
        .then(res => res.json())
        .then(sorted => {
            sorted = sorted.sort((a,b)=>a.lName-b.lName) //change a,b to sort most recent last
            setCrewType(sorted)
        })
    }

    const getCrewTypeById = (id) => {
        return fetch(`http://localhost:8088/crewType/${id}`)
            .then(res => res.json())
    }

    const addCrewType = crewObj => {
        return fetch("http://localhost:8088/crewType", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crewObj)
        })
        .then(getCrewType)
    }

    const deleteCrewType = crewId => {
        return fetch(`http://localhost:8088/crewType/${crewId}`, {
            method: "DELETE"
        })
            .then(getCrewType)
    }

    return (
        <CrewTypeContext.Provider value={{
            crewType, getCrewType, getCrewTypeById, addCrewType, deleteCrewType
        }}>
            {props.children}
        </CrewTypeContext.Provider>
    )
}
