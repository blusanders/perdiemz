import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';

import { CrewContext } from "../crew/CrewProvider";
import { TourContext } from "../tour/TourProvider";
import { TourRunContext } from "./TourRunProvider";
import "./TourRun.css"

import { Button } from 'reactstrap';

export const TourRunForm = () => {

    const { getTourRuns, addTourRun, getTourRunById, updateTourRun, deleteTourRun } = useContext(TourRunContext)
    const { tours, getTours } = useContext(TourContext)
    const { crew, getCrew } = useContext(CrewContext)
    const [ denoms, setDenoms ] = useState()

    //create empty state var to hold form values
    const [tourRun, setTourRun] = useState({
        tourId: 0,
        name: "",
        description: "",
        dateStart: "",
        dateEnd: "",
        timeLeave: "",
        timeArrive: "",
        perDiem: 0,
        daysOut: 0
    })

    //create state var to stop quick clicks on edits
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    //get tourRunId from URL if there but not editing for now
    const { tourRunId } = useParams();

    //update state on every field change
    const handleControlledInputChange = (event) => {
        event.preventDefault()
        const newTourRun = { ...tourRun }
        newTourRun[event.target.id] = event.target.value
        setTourRun(newTourRun)
    }

    const handleDeleteTourRun = (event) => {
        if(window.confirm("Are you sure?")===true){
        deleteTourRun(event.target.id)
        .then(() => {
            history.push("/tourRun")
        })
        }
    }

const calcDenoms = () => {
        let dayRate = 35
        let dayTotal = 15
        let weekTotal = dayRate*dayTotal

        let denArr = [
            [100,1,],
            [50,1,],
            [20,15,],
            [10,,],
            [5,,],
            [1,,]
        ]

        let calcStr
        let remVar
        let modVar
        let calcTotal = weekTotal

        //calculate the # of bills denoms per week
        for (let x = 0; x < denArr.length; x++) {
            remVar = Math.trunc(calcTotal/denArr[x][0])
            modVar = weekTotal%denArr[x][0]
            if(denArr[x][1]===undefined){denArr[x][2]=remVar}
            if(denArr[x][1]>=remVar){denArr[x][2]=remVar}
            if(denArr[x][1]<remVar){denArr[x][2]=denArr[x][1]}
            calcTotal = calcTotal - (denArr[x][0]*denArr[x][2])
            if (calcTotal===0){break}
        }

        //calculate the total # of bills for the entire tour run
        let totalBillsArray = [
            [100,0],
            [50,0],
            [20,0],
            [10,0],
            [5,0],
            [1,0]
        ]

        for (let x = 0; x < denArr.length; x++) {
            if (denArr[x][2]>0){
                totalBillsArray[x][1] = denArr[x][0]*denArr[x][2] 
            }
        }
        
        // setDenoms(totalBillsArray)
        console.table(denArr);
        console.table(totalBillsArray);
        return denArr

}

    const handleSaveTourRun = () => {

        let validForm=false
        let validMsgString=""

        if (tourRun.name.length === 0) {
            validMsgString = "Name is required."
        }else{
            if (tourRun.dateStart.length === 0) {
                validMsgString += "Start date required."
            }else{
                if (tourRun.title.length === 0) {
                    validMsgString += "Title is required."
                }else{
                    if (parseInt(tourRun.tourId) === 0) {
                        validMsgString += "Tour is required."
                    }else{
                        validForm=true
                    }
                }
            }
        }
        
        if (validForm===false) {
            window.alert(validMsgString)
        } else {
        //disable the button - no extra clicks
        setIsLoading(true);

        //if params has tourRunId then UPDATE else ADD
        if (tourRunId){
            //PUT - update
            updateTourRun({
                id: tourRun.id,
                name: tourRun.name,
                description: tourRun.description,
                dateStart: tourRun.dateStart,
                dateEnd: tourRun.dateEnd,
                timeLeave: tourRun.timeLeave,
                timeArrive: tourRun.timeArrive,
                tourId: parseInt(tourRun.tourId),
                perDiem: parseInt(tourRun.perDiem),
                daysOut: parseInt(tourRun.daysOut)
            })
                .then(() => history.push(`/tourRun`))
        }else{
            //POST - add
            addTourRun({
                name: tourRun.name,
                description: tourRun.description,
                dateStart: tourRun.dateStart,
                dateEnd: tourRun.dateEnd,
                timeLeave: tourRun.timeLeave,
                timeArrive: tourRun.timeArrive,
                tourId: parseInt(tourRun.tourId),
                perDiem: parseInt(tourRun.perDiem),
                daysOut: parseInt(tourRun.daysOut)
            })
            .then(setTourRun({  //reset state obj as blank to zero out add form
            name: "",
            description: "",
            dateStart: "",
            dateEnd: "",
            timeLeave: "",
            timeArrive: "",
            tourId: 0,
            perDiem: 0,
            daysOut: 0
            }))
            .then(setIsLoading(false))
            .then(() => history.push("/tourRun"))
        }
        }
    }

    useEffect(() => {
        getTours()
        .then(getCrew())
        .then(setIsLoading(false))
    }, [])

    return (

        <div className="wrapper">

        {/* form is first column */}
        <form className="tourRunForm ">

        <h2 className="tourRunForm__title">{tourRunId ? "" : "Add TourRunz"}</h2>

            <div className="form-group ">
                <label htmlFor="location">Tour: </label>
                <select value={tours.tourId} id="tourId" className="form-control" 
                onChange={handleControlledInputChange}>
                    <option value="0">Select a Tour</option>
                    {tours.map(l => (
                    <option key={l.id} value={l.id}>
                        {l.name}
                    </option>
                    ))}
                </select>
            </div>

            <div className="form-group ">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required autoFocus className="form-control"
                placeholder="Tour Run Name"
                onChange={handleControlledInputChange}
                value={tourRun.name}/>
            </div>

            <div className="form-group ">
                <label htmlFor="dateStart">Date Start:</label>
                <input type="text" id="dateStart" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="Start Date" 
                value={tourRun.dateStart}/>
            </div>

            <div className="form-group ">
                <label htmlFor="dateEnd">Date End:</label>
                <input type="text" id="dateEnd" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="End Date" 
                value={tourRun.dateEnd}/>
            </div>

            <div className="form-group ">
                <label htmlFor="timeLeave">Leave Time:</label>
                <input type="text" id="timeLeave" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="Leave Time" 
                value={tourRun.timeLeave}/>
            </div>

            <div className="form-group ">
                <label htmlFor="timeArrive">Arrive Time:</label>
                <input type="text" id="timeArrive" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="Arrive Time" 
                value={tourRun.timeArrive}/>
            </div>
            

            <button className="btn btn-secondary"
                type="submit"
                disabled={isLoading}
                onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleSaveTourRun()
                }}>

                {/* show ADD or SAVE if adding or editing  */}
                {tourRunId ? "Save TourRun" : "Add TourRun"}

            </button>

        <div className="divider"/>

            {/* only show delete button if editing */}
            {tourRunId ?
            <button type="button" id={tourRunId} className="btn btn-secondary" onClick={handleDeleteTourRun}>
                Delete TourRun
            </button>
            :
            ""
            }
            <div>&nbsp;</div>
        
        <div className="formNotice">*All Fields Required</div>
        
        </form>

        {/* second column */}
        <div>

            <h2 className="tourRunForm__title">Calcz</h2>

            <div className="form-group ">
                    <label htmlFor="perDiemAmount">Per Diem:</label>
                    <input type="text" id="perDiemAmount" 
                    
                    required className="form-control" 
                    placeholder="Per Diem Amount" 
                    defaultValue="25"/>
            </div>

            <div className="form-group ">
                    <label htmlFor="timeArrive">Days Out:</label>
                    <input type="text" id="daysOut" 
                    onChange={handleControlledInputChange}
                    required className="form-control" 
                    placeholder="Days Out" 
                    defaultValue="5"/>
            </div>

            <div className="calc">
                <div className="form-group ">
                        <label htmlFor="100s">100s</label>
                        <input type="text" id="100s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="" 
                        defaultValue="*"/>
                </div>

                <div className="form-group ">
                        <label htmlFor="50s">50s</label>
                        <input type="text" id="50s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        defaultValue="*"/>
                </div>

                <div className="form-group ">
                        <label htmlFor="20s">20s</label>
                        <input type="text" id="20s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        defaultValue="*"/>
                </div>

                <div className="form-group ">
                        <label htmlFor="10s">10s</label>
                        <input type="text" id="10" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        defaultValue="*"/>
                </div>

                <div className="form-group ">
                        <label htmlFor="5s">5s</label>
                        <input type="text" id="5s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        defaultValue="*"/>
                </div>

                <div className="form-group ">
                        <label htmlFor="1s">1s</label>
                        <input type="text" id="1s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        defaultValue="*"/>
                </div>
                
            </div>

            <div>Crew total: {crew.length} (array length of crew fetch)</div>
            <div>Per Diem total: calculate this from state vars</div>
            <div>
                Denoms: {calcDenoms()}
                
            </div>
        </div>

    </div>
    )
    }