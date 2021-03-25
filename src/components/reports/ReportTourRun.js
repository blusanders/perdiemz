import React, { useContext, useEffect, useState, useMemo } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { TourContext } from "../tour/TourProvider";
import { TourRunContext } from "../tourrun/TourRunProvider";
import { CrewContext } from "../crew/CrewProvider";
import "./Reports.css"

export const ReportTourRun = () => {

    // const { crew, getCrew } = useContext(CrewContext)
    const { crewAvailable, getCrewAvailable } = useContext(CrewContext)
    const { tourRunsByTourId, getTourRunsByTourId } = useContext(TourRunContext)
    const { tours, getTours } = useContext(TourContext)

    const [ pdTotal, setPdTotal ] = useState(0)
    const [ showReport, setShowReport ] = useState(false)
    
    useEffect(() => {
        getTours()
    }, [])

    useEffect(() => {
        getCrewAvailable()
    }, [])

    //refresh report if tour selected from dropdown
    const handleControlledInputChange = (event) => {
        // debugger
        let tourId = parseInt(event.target.value)
        if(tourId!==0){
            getTourRunsByTourId(tourId)
            setShowReport(true)
        }else{
            setShowReport(false)
        }
    }

    //calculate total perdiem for all runs in selected tour
    const sumPerDiem = () => {
        let sumVar = 0
            tourRunsByTourId.forEach(x => {
                sumVar += x.perDiem*x.daysOut*crewAvailable.length
            })
            return sumVar
    }

    // return total with commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (

    <div>

        {/* all tours for dropdown */}
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
    
    {showReport===true ? 
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
                <tbody>
                {
                    tourRunsByTourId.map(tour =>{
                        return(
                            <>
                            <tr>
                                <td className="reportTourRunList">{tour.name}</td>
                                <td className="reportTourRunList">{tour.dateStart}</td>
                                <td className="reportTourRunList">{tour.dateEnd}</td>
                                <td className="reportTourRunList">{tour.perDiem}</td>
                                <td className="reportTourRunList">{tour.daysOut}</td>
                                <td className="reportTourRunList">{crewAvailable.length}</td>
                                <td className="reportTourRunList">{tour.perDiem*tour.daysOut}</td>
                                <td className="reportTourRunList">{tour.perDiem*tour.daysOut*crewAvailable.length}</td>
                            </tr>
                            </>
                        ) 
                    })
                }
                            <tr><td colSpan="8" align="right"><b>Tour Total: ${numberWithCommas(sumPerDiem())}</b></td></tr>
                </tbody>
            </table>
        </div>

        :
        ""
        }

    </div>

)
}
