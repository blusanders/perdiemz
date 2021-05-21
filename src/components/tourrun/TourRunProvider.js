import React, { useContext, useState, createContext } from "react"
import { TourRunCrewContext } from "../touruncrew/TourRunCrewProvider";
import { authApi } from "./../auth/authSettings"

// The context is imported and used by individual components that need data
export const TourRunContext = createContext()

// This component establishes what data can be used.
export const TourRunProvider = (props) => {
    const [tourRuns, setTourRuns] = useState([])
    const [tourRunsByTourId, setTourRunsByTourId] = useState([])

    const getTourRuns = () => {
        return fetch(authApi.localApiBaseUrl+"/tourruns?_expand=tour")
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
        })
    }

    const getTourRunById = (id) => {
        return fetch(authApi.localApiBaseUrl+`/tourruns/${id}`)
            .then(res => res.json())
    }

    const getTourRunsByTourId = (tourId) => {
        // debugger
        let fetchURL =authApi.localApiBaseUrl+`/tourruns/?tourId=${tourId}` 
        return fetch(fetchURL)
            .then(res => res.json())
            .then(setTourRunsByTourId)
    }
    
    const addTourRun = tourRunObj => {
        return fetch(authApi.localApiBaseUrl+"/tourruns", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourRunObj)
        })
        .then(res => res.json())
    }


    const updateTourRun = tourRun => {
        return fetch(authApi.localApiBaseUrl+`/tourruns/${tourRun.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(tourRun)
        })
            .then(getTourRuns)
    }

    const deleteTourRun = tourRunId => {
        return fetch(authApi.localApiBaseUrl+`/tourruns/${tourRunId}`, {
            method: "DELETE"
        })
            .then(getTourRuns)
    }

    return (
        <TourRunContext.Provider value={{
            tourRuns, setTourRuns, getTourRuns, tourRunsByTourId, getTourRunById, addTourRun, deleteTourRun, updateTourRun, getTourRunsByTourId
        }}>
            {props.children}
        </TourRunContext.Provider>
    )
}
