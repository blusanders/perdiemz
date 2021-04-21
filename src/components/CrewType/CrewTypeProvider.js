import React, { useState, createContext } from "react"
import { authApi } from "./../auth/authSettings"

// The context is imported and used by individual components that need data
export const CrewTypeContext = createContext()

// This component establishes what data can be used.
export const CrewTypeProvider = (props) => {
    const [crewTypes, setCrewTypes] = useState([])

    const getCrewTypes = () => {
        return fetch(authApi.localApiBaseUrl+"/crewTypes")
        .then(res => res.json())
        .then(sorted => {
            sorted = sorted.sort((a,b)=>{
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
            })

            setCrewTypes(sorted)
        })
    }

    const getCrewTypeById = (id) => {
        return fetch(authApi.localApiBaseUrl+`/crewTypes/${id}`)
            .then(res => res.json())
    }

    const addCrewType = crewObj => {
        return fetch("http://localhost:8088/crewTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crewObj)
        })
        .then(getCrewTypes)
    }

    const deleteCrewType = crewId => {
        return fetch(authApi.localApiBaseUrl+`/crewTypes/${crewId}`, {
            method: "DELETE"
        })
            .then(getCrewTypes)
    }

    return (
        <CrewTypeContext.Provider value={{
            crewTypes, getCrewTypes, getCrewTypeById, addCrewType, deleteCrewType
        }}>
            {props.children}
        </CrewTypeContext.Provider>
    )
}
