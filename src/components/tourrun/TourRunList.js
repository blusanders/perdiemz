import React, { useContext, useEffect } from "react";
import { TourRunContext } from "./TourRunProvider";
import { TourRunCard } from "./TourRunCard";
import { TourContext } from "../tour/TourProvider";

//lists each tour Run with a link to the Per Diem report 

export const TourRunList = () => {

    const { tourRuns, getTourRuns } = useContext(TourRunContext)
    const { tours, getTours } = useContext(TourContext)

    useEffect(() => {
        getTours()
        .then(getTourRuns())
    }, [])

    return (
        tourRuns.map(tourRun => {
            if(tours.find(tour=>tour.id===tourRun.tourId)){
                return <TourRunCard key={tourRuns.id} tourRun={tourRun}/>
            }
        })
    )
}

