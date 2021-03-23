import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CrewContext = createContext()

// This component establishes what data can be used.
export const CrewProvider = (props) => {
    const [crew, setCrew] = useState([])
    const [crewAvailable, setCrewAvailable] = useState([])

    const getCrew = () => {
        return fetch("http://localhost:8088/crew?_expand=crewType")
        .then(res => res.json())
        .then(sorted => {

            sorted = sorted.sort((a, b) => {
                let retval = 0;
                if (a.available > b.available)
                    retval = -1;
                if (a.available < b.available)
                    retval = 1;
                if (retval === 0)
                    retval = a.lastName < b.lastName ? -1 : 1;
                return retval;
                })

            setCrew(sorted)
        })
    }

    const getCrewAvailable = (id) => {
        return fetch(`http://localhost:8088/crew/?available=true`)
            .then(res => res.json())
            .then(setCrewAvailable)
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

    const updateCrew = crew => {
        return fetch(`http://localhost:8088/crew/${crew.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(crew)
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
            crew, getCrew, getCrewById, addCrew, deleteCrew, updateCrew, getCrewAvailable
        }}>
            {props.children}
        </CrewContext.Provider>
    )
}
