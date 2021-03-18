import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const TourRunContext = createContext()

// This component establishes what data can be used.
export const TourRunProvider = (props) => {
    const [tourRuns, setTourRuns] = useState([])

    const getTourRuns = () => {
        return fetch("http://localhost:8088/tourRun?_expand=tour")
        .then(res => res.json())
        .then(sorted => {
            sorted = sorted.sort((a,b)=>a.lName-b.lName) //change a,b to sort most recent last
            setTourRuns(sorted)
        })
    }

    const getTourRunById = (id) => {
        return fetch(`http://localhost:8088/tourRun/${id}`)
            .then(res => res.json())
    }

    const addTourRun = tourRunObj => {
        return fetch("http://localhost:8088/tourRun", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourRunObj)
        })
        .then(getTourRuns)
    }

    const deleteTourRun = tourRunId => {
        return fetch(`http://localhost:8088/tourRun/${tourRunId}`, {
            method: "DELETE"
        })
            .then(getTourRuns)
    }

    return (
        <TourRunContext.Provider value={{
            tourRuns, getTourRuns, getTourRunById, addTourRun, deleteTourRun
        }}>
            {props.children}
        </TourRunContext.Provider>
    )
}
