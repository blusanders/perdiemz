import React, { useContext, useState, createContext } from "react"
import { TourRunCrewContext } from "../tourRunCrew/TourRunCrewProvider";

// The context is imported and used by individual components that need data
export const TourRunContext = createContext()

// This component establishes what data can be used.
export const TourRunProvider = (props) => {
    const [tourRuns, setTourRuns] = useState([])
    const [tourRunsByTourId, setTourRunsByTourId] = useState([])
    const { addTourRunCrew } = useContext(TourRunCrewContext)

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
        })
    }

    const getTourRunById = (id) => {
        return fetch(`http://localhost:8088/tourrun/${id}`)
            .then(res => res.json())
    }

    const getTourRunsByTourId = (tourId) => {
        // debugger
        let fetchURL =`http://localhost:8088/tourrun/?tourId=${tourId}` 
        return fetch(fetchURL)
            .then(res => res.json())
            .then(setTourRunsByTourId)
    }
    
    const addTourRun = tourRunObj => {
        return fetch("http://localhost:8088/tourrun", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourRunObj)
        })
        .then(res => res.json())
        .then(newTourRunObj => {
            console.log(newTourRunObj.id)
            //for unique PD per crew member
            //could accept an array parameter of all crew/pd/daysOut
            //and then that into addTourRunCrew as well
            // addTourRunCrew(newTourRunObj.id)
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
            tourRuns, setTourRuns, getTourRuns, tourRunsByTourId, getTourRunById, addTourRun, deleteTourRun, updateTourRun, getTourRunsByTourId
        }}>
            {props.children}
        </TourRunContext.Provider>
    )
}
