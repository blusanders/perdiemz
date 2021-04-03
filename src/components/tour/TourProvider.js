import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const TourContext = createContext()

// This component establishes what data can be used.
export const TourProvider = (props) => {
    const [tours, setTours] = useState([])

    const getTours = () => {
        // debugger
        //only pull tours for logged in user
        let fetchURL = "http://localhost:8088/tours?userId="+sessionStorage.getItem("app_user_id") 
        return fetch(fetchURL)
        .then(res => res.json())
        .then(sorted => {
            sorted = sorted.sort((a,b)=>{
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
            })
            setTours(sorted)
        })
    }

    const getTourById = (id) => {
        return fetch(`http://localhost:8088/tours/${id}`)
            .then(res => res.json())
    }

    const addTour = tourObj => {
        // debugger
        return fetch("http://localhost:8088/tours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourObj)
        })
        .then(getTours)
    }

    const updateTour = tour => {
        debugger
        return fetch(`http://localhost:8088/tours/${tour.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
            .then(getTours)
        }


    const deleteTour = tourId => {
        return fetch(`http://localhost:8088/tours/${tourId}`, {
            method: "DELETE"
        })
            .then(getTours)
    }

    return (
        <TourContext.Provider value={{
            tours, getTours, getTourById, addTour, deleteTour, updateTour
        }}>
            {props.children}
        </TourContext.Provider>
    )
}
