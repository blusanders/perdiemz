import React, { useContext, useEffect, useState, useMemo } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { TourContext } from "../tour/TourProvider";
import { TourRunContext } from "../tourrun/TourRunProvider";
import { CrewContext } from "../crew/CrewProvider";
import "./Reports.css"

export const ReportTourRun = () => {

    const { crew, getCrew } = useContext(CrewContext)
    const [ crewTotalActive, setCrewTotalActive ] = useState(0)
    const [ pdTotal, setPdTotal ] = useState()
    const { tourRunsByTourId, getTourRunsByTourId } = useContext(TourRunContext)
    const { tours, getTours } = useContext(TourContext)
    
    useEffect(() => {
        getTours()
    }, [])

useEffect(() => {
    getCrew()
    .then(()=>{
        let crewTotalActiveVar = crew.filter(crewMember => crewMember.available === true).length
        // console.log(crew.length);
        setCrewTotalActive(crewTotalActiveVar)
        // console.log(crewTotalActive);
    })
}, [])

    const handleControlledInputChange = (event) => {
        let tourId = event.target.value
        if(tourId!==0){
            //show report if selected
            getTourRunsByTourId(tourId)
        }
    }

    return (

    <div>

        <div className="form-group ">
            <select autoFocus id="tourId" className="form-control" 
            onChange={handleControlledInputChange}>
                <option value="0">Select a Tour</option>
                {tours.map(l => (
                <option key={l.id} value={l.id}>
                    {l.name}
                </option>
                ))}
            </select>
        </div>
    
        <div>
            <table className="reportTourRun">
                <thead>
                    <tr>
                        <th>Tour Run Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>$PD</th>
                        <th>Days Out</th>
                        <th>Crew</th>
                        <th>$PD Per</th>
                        <th>$PD Total</th>
                    </tr>
                </thead>
                {
                    tourRunsByTourId.map(tour =>{
                        return(
                            <tr>
                                <td className="reportTourRunList">{tour.name}</td>
                                <td className="reportTourRunList">{tour.dateStart}</td>
                                <td className="reportTourRunList">{tour.dateEnd}</td>
                                <td className="reportTourRunList">{tour.perDiem}</td>
                                <td className="reportTourRunList">{tour.daysOut}</td>
                                <td className="reportTourRunList">{crewTotalActive}</td>
                                <td className="reportTourRunList">{tour.perDiem*tour.daysOut}</td>
                                <td className="reportTourRunList">{tour.perDiem*tour.daysOut*crewTotalActive}</td>
                            </tr>
                        ) 
                    })
                }
            </table>
        </div>

    </div>

)
}
