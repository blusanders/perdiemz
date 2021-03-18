import React, { useContext, useEffect } from "react";
import { TourRunContext } from "./TourRunProvider";
import { TourRunCard } from "./TourRunCard";

//lists each tour Run with a link to the Per Diem report 

export const TourRunList = () => {

    const { tourRuns, getTourRuns } = useContext(TourRunContext)

    useEffect(() => {
        getTourRuns()
    }, [])

    return (
        tourRuns.map(tourRun => {
            return <TourRunCard key={tourRuns.id} tourRun={tourRun} />
        })
        )
}
