import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';

import { CrewContext } from "../crew/CrewProvider";
import { TourContext } from "../tour/TourProvider";
import { TourRunContext } from "./TourRunProvider";
import "./TourRun.css"

import { Button } from 'reactstrap';

export const TourRunForm = () => {

    const { getTourRuns, addTourRun, getTourRunById, updateTourRun, deleteTourRun } = useContext(TourRunContext)
    const { tours, getTours, } = useContext(TourContext)
    const { crew, getCrew } = useContext(CrewContext)
    const [ denArrState, setDenArrState ] = useState()

    //     [
    //         [100,,0,0],
    //         [500,,0,0],
    //         [20,,0,0],
    //         [10,,0,0],
    //         [5,,0,0],
    //         [1,,0,0]
    //     ]
    // )

    //create empty state var to hold form values
    //initial values for add form only
    //will be reaplced by fetch call from ID in params
    const [tourRun, setTourRun] = useState({
        tourId: 0,
        name: "",
        description: "",
        dateStart: "",
        dateEnd: "",
        timeLeave: "10p",
        timeArrive: "9a",
        perDiem: 25,
        daysOut: 5,
        denoms: ["*","*","*","*","*","*",]
    })

    //create state var to stop quick clicks on edits
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    //get tourRunId from URL if exists
    const { tourRunId } = useParams();

    //update state on every field change
    const handleControlledInputChange = (event) => {
        event.preventDefault()
        const newTourRun = { ...tourRun }

        //if max bills fields change then put them in the appropriate array location in denoms
        switch(event.target.id) {
            case "100s":
                newTourRun["denoms"][0] = event.target.value
                break;
            case "50s":
                newTourRun["denoms"][1] = event.target.value
                break;
            case "20s":
                newTourRun["denoms"][2] = event.target.value
                break;
            case "10s":
                newTourRun["denoms"][3] = event.target.value
                break;
            case "5s":
                newTourRun["denoms"][4] = event.target.value
                break;
            case "1s":
                newTourRun["denoms"][5] = event.target.value
                break;
            default: //if not max bills field then add to object normally 
                newTourRun[event.target.id] = event.target.value
        }
        
        //set the tourRun object with values after input change
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
        let dayRate = tourRun.perDiem
        let dayTotal = tourRun.daysOut
        let crewTotal = crew.length
        let calcTotal = dayRate*dayTotal
        let runTotal = calcTotal*crewTotal

        let max100=tourRun.denoms[0]
        let max50=tourRun.denoms[1]
        let max20=tourRun.denoms[2]
        let max10=tourRun.denoms[3]
        let max5=tourRun.denoms[4]
        let max1=tourRun.denoms[5]

        if (tourRun.denoms[0]==="*") {max100=100}else{max100=parseInt(max100)} 
        if (max50==="*") {max50=100}else{max50=parseInt(max50)} 
        if (max20==="*") {max20=100}else{max20=parseInt(max20)} 
        if (max10==="*") {max10=100}else{max10=parseInt(max10)} 
        if (max5==="*") {max5=100}else{max5=parseInt(max5)} 
        if (max1==="*") {max1=100}else{max1=parseInt(max1)} 

        //1-denomintion, 2-max bills, 3-total bills for denomination, 4-total bills for week 
        let denArr =[ 
            [100,max100,,0],
            [50,max50,,0],
            [20,max20,,0],
            [10,max10,,0],
            [5,max5,,0],
            [1,max1,,0]
        ]

        // let denArr = [
        //     [100,0,,0],
        //     [50,0,,0],
        //     [20,10,,0],
        //     [10,,,0],
        //     [5,,,0],
        //     [1,,,0]
        // ]

        let remVar      //integer after dividing and .trunc 
        let modVar      //modulo after dividing 

        //iterate through 
        for (let x = 0; x < denArr.length; x++) {

            //divide remaining total into bill denom
            //first total is grand total
            remVar = Math.trunc(calcTotal/denArr[x][0])
            modVar = calcTotal%denArr[x][0]

            //calculate max bills per single crew member per denom
            if(denArr[x][1]===undefined){denArr[x][2]=remVar}
            if(denArr[x][1]>=remVar){denArr[x][2]=remVar}
            if(denArr[x][1]<remVar){denArr[x][2]=denArr[x][1]}

            //get sum of bills for denom 
            denArr[x][3]=denArr[x][2]*crewTotal

            calcTotal = calcTotal - (denArr[x][0]*denArr[x][2])
        }

        // setDenArrState(denArr)
        console.table(denArr);
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
                if (tourRun.dateEnd.length === 0) {
                    validMsgString += "End date required."
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
                daysOut: parseInt(tourRun.daysOut),
                denoms:[
                    tourRun.denoms[0],
                    tourRun.denoms[1],
                    tourRun.denoms[2],
                    tourRun.denoms[3],
                    tourRun.denoms[4],
                    tourRun.denoms[5]
                ]
            })
                .then(() => history.push(`/tourrun`))
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
                daysOut: parseInt(tourRun.daysOut),
                denoms:[
                    tourRun.denoms[0],
                    tourRun.denoms[1],
                    tourRun.denoms[2],
                    tourRun.denoms[3],
                    tourRun.denoms[4],
                    tourRun.denoms[5]
                ]
            })
            .then(setTourRun({  //reset state obj as blank to zero out add form
                name: "",
                description: "",
                dateStart: "",
                dateEnd: "",
                timeLeave: "",
                timeArrive: "",
                tourId: 0,
                perDiem: 25,
                daysOut: 5,
                denoms: ["*","*","*","*","*","*",]
            }))
            .then(setIsLoading(false))
            .then(() => history.push("/tourRun"))
        }
        }
    }

    useEffect(() => {
        getCrew()
        .then(getTours())
        .then(() => {
        if (tourRunId) {
            getTourRunById(tourRunId)
            .then(tourRunObj => {
                setTourRun(tourRunObj)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
        })
    }, [])

    useEffect(() => {
        // calcDenoms() //this is not working?
    }, [])

    return (

        <div className="wrapper">

        {/* form is first column */}
        <form className="tourRunForm ">

        <h2 className="tourRunForm__title">{tourRunId ? "Edit TourRun" : "Add TourRunz"}</h2>

            <div className="form-group ">
                <label htmlFor="location">Tour: </label>
                <select value={tourRun.tourId} id="tourId" className="form-control" 
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
                {tourRunId ? "Save Tour Run" : "Add Tour Run"}

            </button>

        <div className="divider"/>

            {/* only show delete button if editing */}
            {tourRunId ?
            <button type="button" id={tourRunId} className="btn btn-secondary" onClick={handleDeleteTourRun}>
                Delete Tour Run
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
                    <label htmlFor="perDiem">Per Diem:</label>
                    <input type="text" id="perDiem" 
                    onChange={handleControlledInputChange}
                    required className="form-control" 
                    placeholder="Per Diem Amount" 
                    defaultValue=""
                    maxlength="2"
                    value={tourRun.perDiem}
                    />
            </div>

            <div className="form-group ">
                    <label htmlFor="timeArrive">Days Out:</label>
                    <input type="text" id="daysOut" 
                    onChange={handleControlledInputChange}
                    required className="form-control" 
                    placeholder="Days Out" 
                    maxlength="2"
                    defaultValue=""
                    value={tourRun.daysOut}
                    />
            </div>

            <div>Max Billz (*=any amount)</div>
            <div className="calc">
                <div className="form-group ">
                        <label htmlFor="100s">100s</label>
                        <input type="text" id="100s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any"
                        defaultValue="*"
                        maxlength="2"
                        value={tourRun.denoms[0]}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="50s">50s</label>
                        <input type="text" id="50s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxlength="2"
                        defaultValue="*"
                        value={tourRun.denoms[1]}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="20s">20s</label>
                        <input type="text" id="20s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxlength="2"
                        defaultValue="*"
                        value={tourRun.denoms[2]}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="10s">10s</label>
                        <input type="text" id="10s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxlength="2"
                        defaultValue="*"
                        value={tourRun.denoms[3]}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="5s">5s</label>
                        <input type="text" id="5s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxlength="2"
                        defaultValue="*"
                        value={tourRun.denoms[4]}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="1s">1s</label>
                        <input type="text" id="1s" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any"
                        value={tourRun.denoms[5]}
                        defaultValue="*"/>
                </div>
                
            </div>

            <div>Crew total: {crew.length}</div>
            <div>Per Diem total: {tourRun.perDiem*tourRun.daysOut*crew.length}</div>
            <div>
            <table>
                <thead>
                    <tr>
                        <th colspan="3">Denomz</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>100s - {calcDenoms()[0][3]}</td>
                        <td>50s - {calcDenoms()[1][3]}</td>
                        <td>20s - {calcDenoms()[2][3]}</td>
                    </tr>
                    <tr>
                        <td>10s - {calcDenoms()[3][3]}</td>
                        <td>5s - {calcDenoms()[4][3]}</td>
                        <td>1s - {calcDenoms()[5][3]}</td>
                    </tr>
                </tbody>
            </table>
 
            </div>
        </div>

    </div>
    )
    }