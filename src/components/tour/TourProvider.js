import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const TourContext = createContext()

// This component establishes what data can be used.
export const TourProvider = (props) => {
    const [tours, setTours] = useState([])

    const getTours = () => {
        return fetch("http://localhost:8088/tours")
        .then(res => res.json())
        .then(sorted => {
            sorted = sorted.sort((a,b)=>a.name-b.name) //change a,b to sort most recent last
            setTours(sorted)
        })
    }

    const getTourById = (id) => {
        return fetch(`http://localhost:8088/tour/${id}`)
            .then(res => res.json())
    }

    const addTour = tourObj => {
        return fetch("http://localhost:8088/tour", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourObj)
        })
        .then(getTours)
    }

    const deleteTour = tourId => {
        return fetch(`http://localhost:8088/tour/${tourId}`, {
            method: "DELETE"
        })
            .then(getTours)
    }

    return (
        <TourContext.Provider value={{
            tours, getTours, getTourById, addTour, deleteTour
        }}>
            {props.children}
        </TourContext.Provider>
    )
}
