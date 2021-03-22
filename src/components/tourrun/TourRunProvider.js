import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const TourRunContext = createContext()

// This component establishes what data can be used.
export const TourRunProvider = (props) => {
    const [tourRuns, setTourRuns] = useState([])

    const getTourRuns = () => {
        return fetch("http://localhost:8088/tourrun?_expand=tour")
        .then(res => res.json())
        .then(sorted => {

            sorted = sorted.sort((a, b) => {
                let retval = 0;
                if (a.tourId < b.tourId)
                    retval = -1;
                if (a.tourId > b.tourId)
                    retval = 1;
                if (retval === 0)
                    retval = a.name < b.name ? -1 : 1;
                return retval;
                })
                setTourRuns(sorted)
            }
                    )
        }

    const getTourRunById = (id) => {
        return fetch(`http://localhost:8088/tourrun/${id}`)
            .then(res => res.json())
    }

    const addTourRun = tourRunObj => {
        return fetch("http://localhost:8088/tourrun", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourRunObj)
        })
        .then(getTourRuns)
    }

    const updateTourRun = tourRun => {
        return fetch(`http://localhost:8088/tourrun/${tourRun.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(tourRun)
        })
            .then(getTourRuns)
    }

    const deleteTourRun = tourRunId => {
        return fetch(`http://localhost:8088/tourrun/${tourRunId}`, {
            method: "DELETE"
        })
            .then(getTourRuns)
    }

    return (
        <TourRunContext.Provider value={{
            tourRuns, getTourRuns, getTourRunById, addTourRun, deleteTourRun, updateTourRun
        }}>
            {props.children}
        </TourRunContext.Provider>
    )
}
