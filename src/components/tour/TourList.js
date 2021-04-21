import React, { useContext, useEffect } from "react";
import { TourContext } from "./TourProvider";
import { TourCard } from "./TourCard";

export const TourList = () => {

    const { tours, getTours } = useContext(TourContext)

    useEffect(() => {
        getTours()
    }, [])

    return (
        tours.map(tourMember => {
            return <TourCard key={tourMember.id} tour={tourMember} />
        }
        )
    )
}
