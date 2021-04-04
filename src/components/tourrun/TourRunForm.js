import React, { useContext, useEffect, useState, useMemo } from "react"
import { useHistory, useParams } from 'react-router-dom';

import { CrewContext } from "../crew/CrewProvider";
import { TourContext } from "../tour/TourProvider";
import { TourRunContext } from "./TourRunProvider";
import { TourRunCrewContext } from "../tourRunCrew/TourRunCrewProvider";

import "./TourRun.css"

import { Button } from 'reactstrap';

export const TourRunForm = () => {

    const { getTourRuns, addTourRun, getTourRunById, updateTourRun, deleteTourRun } = useContext(TourRunContext)
    const { tours, getTours, } = useContext(TourContext)
    const { crew, getCrew } = useContext(CrewContext)
    const { crewAvailable, getCrewAvailable } = useContext(CrewContext)
    const [ validMsgString, setValidMsgString ] = useState("") 
    const { addTourRunCrew, deleteTourRunCrew } = useContext(TourRunCrewContext)
    const [ checkVar, setCheckVar ] = useState(true)

    // const [ denArrState, setDenArrState ] = useState(
    //         [ 
    //         [100,1000,0,0],
    //         [50,1000,0,0],
    //         [20,1000,0,0],
    //         [10,1000,0,0],
    //         [5,1000,0,0],
    //         [1,1000,0,0]
    //         ]
    // )

    const [ denArrState, setDenArrState ] = useState(
            [
            [100,"","",0],
            [50,"","",0],
            [20,"","",0],
            [10,"","",0],
            [5,"","",0],
            [1,"","",0]
            ]
    )

    //create empty state var to hold form values
    //initial values for add form only
    //will be reaplced by fetch call from ID in params
    const [tourRun, setTourRun] = useState({
        tourId: 0,
        name: "",
        description: "",
        dateStart: "",
        dateEnd: "",
        timeLeave: "",
        timeArrive: "",
        perDiem: 0,
        daysOut: 0,
        d100: "",
        d50: "",
        d20: "",
        d10: "",
        d5: "",
        d1: ""
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
        newTourRun[event.target.id] = event.target.value
        setTourRun(newTourRun)
    }

    const handleDeleteTourRun = (event) => {
        // debugger
        if(window.confirm("Are you sure?")===true){
        deleteTourRun(event.target.id)
        .then(() => {
            history.push("/tourRun")
        })
        }
    }

    //takes per diem * days out and max bill denoms to calculate
    //how many of each demon to request for the tour run
    const calcDenoms = () => {
        let dayRate = tourRun.perDiem
        let dayTotal = tourRun.daysOut
        let crewTotal = crewAvailable.length
        let calcTotal = dayRate*dayTotal
        // let runTotal = calcTotal*crewTotal

        //changed names for...not sure why.  
        let max100=tourRun.d100
        let max50=tourRun.d50
        let max20=tourRun.d20
        let max10=tourRun.d10
        let max5=tourRun.d5
        let max1=tourRun.d1
        
        //chose * for asthetics and to not have to deal with null vs blank values
        //explicitly selecting * means you definitely want any # of bills
        //setting each value to 100 bc * is not something calculable and 100 will never be reached 
        if (max100==="") {max100=1000}else{max100=parseInt(max100)} 
        if (max50==="") {max50=1000}else{max50=parseInt(max50)} 
        if (max20==="") {max20=1000}else{max20=parseInt(max20)} 
        if (max10==="") {max10=1000}else{max10=parseInt(max10)} 
        if (max5==="") {max5=1000}else{max5=parseInt(max5)} 
        if (max1==="") {max1=1000}else{max1=parseInt(max1)} 

        //1-denomintion, 2-max bills, 3-total bills for denomination, 4-total bills for week 
        let denArr =[ 
            [100,max100,"",0],
            [50,max50,"",0],
            [20,max20,"",0],
            [10,max10,"",0],
            [5,max5,"",0],
            [1,max1,"",0]
        ]

        let remVar      //integer after dividing and .trunc 
        let modVar      //modulo after dividing 

        //iterate through denoms
        for (let x = 0; x < denArr.length; x++) {

            //divide remaining total into bill denom
            remVar = Math.trunc(calcTotal/denArr[x][0])
            modVar = calcTotal%denArr[x][0]

            //calculate max bills per single crew member per denom
            if(denArr[x][1]===undefined){denArr[x][2]=remVar}
            if(denArr[x][1]>=remVar){denArr[x][2]=remVar}
            if(denArr[x][1]<remVar){denArr[x][2]=denArr[x][1]}

            //get sum of bills for denom 
            denArr[x][3]=denArr[x][2]*crewTotal

            calcTotal = calcTotal - (denArr[x][0]*denArr[x][2])

            //on the last iteration
            //check the total vs bill denoms
            //if it doesn't add up, change the styling of the total 
            if (x===5){
                let checkTotal = 0
                for (let index = 0; index < 6; index++) {
                    checkTotal = checkTotal + (denArr[index][0]*denArr[index][2]*crewAvailable.length)
                    // console.log(index +" : "+ denArr[index][0]+" : "+denArr[index][2]+" : "+crewAvailable.length+" : "+checkTotal)
                }
                if(checkTotal!==tourRun.perDiem*tourRun.daysOut*crewAvailable.length){
                    setCheckVar(false)
                    // console.log("No total is wrong");
                }else{
                    setCheckVar(true)
                    // console.log("Yes total is right");
                };
            }
        }

        setDenArrState(denArr)
        return denArr
    }

    const handleSaveTourRun = () => {

        let validForm=false
        let validMsgString=""

        if (tourRun.name.length === 0) {
            validMsgString += "Name is required."
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
                d100: tourRun.d100,
                d50: tourRun.d50,
                d20: tourRun.d20,
                d10: tourRun.d10,
                d5: tourRun.d5,
                d1: tourRun.d1
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
                d100: tourRun.d100,
                d50: tourRun.d50,
                d20: tourRun.d20,
                d10: tourRun.d10,
                d5: tourRun.d5,
                d1: tourRun.d1
            })
            .then(newTourRunObj => { //get added tour run obj

                //for every available crew member, add to tour crew join table with new id from addTourRun fetch
                crewAvailable.map(crewMember=>{
                    let crewMemberObj = {
                        tourRunId: newTourRunObj.id,
                        crewId: crewMember.id
                    }
                    addTourRunCrew(crewMemberObj)
                    // console.log(newTourRunObj.id + " " + crewMember.firstName + " " + crewMember.lastName);
                })
            })
            .then(getTourRuns) //reset list of tour runs with new added run 
            .then(setTourRun({  //reset state obj as blank to zero out add form
                name: "",
                description: "",
                dateStart: "",
                dateEnd: "",
                timeLeave: "",
                timeArrive: "",
                tourId: 0,
                perDiem: 0,
                daysOut: 0,
                d100: "",
                d50: "",
                d20: "",
                d10: "",
                d5: "",
                d1: ""
            }))
            .then(setIsLoading(false))
            .then(() => history.push("/tourRun"))
        }
        }
    }

    useEffect(() => {
        getTours()
        // getCrew()
        // .then(getTours())
    }, [])
    
    useEffect(()=>{
        if (tourRunId) {
            getTourRunById(tourRunId)
            .then(tourRunObj => {
// debugger
                setTourRun(tourRunObj)
// debugger
console.log(tourRun);
                // let denArrEdit =[ 
                //     [100,tourRunObj.d100,,0],
                //     [50,tourRunObj.d50,,0],
                //     [20,tourRunObj.d20,,0],
                //     [10,tourRunObj.d10,,0],
                //     [5,tourRunObj.d5,,0],
                //     [1,tourRunObj.d1,,0]
                // ]
// 
                // setDenArrState(denArrEdit)
                calcDenoms()
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [tourRunId])

    useEffect(()=>{
        getCrewAvailable()
        .then(calcDenoms())
    },[
        tourRun.d100,
        tourRun.d50,
        tourRun.d20,
        tourRun.d10,
        tourRun.d5,
        tourRun.d1,
        tourRun.perDiem,
        tourRun.daysOut
    ])

    return (

        <div className="wrapper">

        {/* form is first column */}
        <div>
        <h2 className="tourRunForm__title">{tourRunId ? "Edit TourRun" : "Add TourRunz"}</h2>
        <form className="tourRunForm ">

            <div className="form-group ">
                <label htmlFor="location">Tour: </label>
                <select autoFocus value={tourRun.tourId} id="tourId" className="form-control" 
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
                <input type="text" id="name" required className="form-control"
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
        </div>
        {/* second column */}
        <div>

            <h2 className="tourRunForm__title">Calcz</h2>

            <div className="form-group ">
                    <label htmlFor="perDiem">Per Diem:</label>
                    <input type="text" id="perDiem" 
                    onChange={handleControlledInputChange}
                    required className="form-control" 
                    placeholder="Per Diem Amount" 
                    maxLength="2"
                    value={tourRun.perDiem}
                    />
            </div>

            <div className="form-group ">
                    <label htmlFor="timeArrive">Days Out:</label>
                    <input type="text" id="daysOut" 
                    onChange={handleControlledInputChange}
                    required className="form-control" 
                    placeholder="Days Out" 
                    maxLength="2"
                    value={tourRun.daysOut}
                    />
            </div>

            <div>Max Billz (*=any amount)</div>
            <div className="calc">
                <div className="form-group ">
                        <label htmlFor="100s">100s</label>
                        <input type="text" id="d100" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any"
                        maxLength="2"
                        value={tourRun.d100}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="50s">50s</label>
                        <input type="text" id="d50" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxLength="2"
                        value={tourRun.d50}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="20s">20s</label>
                        <input type="text" id="d20" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxLength="2"
                        value={tourRun.d20}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="10s">10s</label>
                        <input type="text" id="d10" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxLength="2"
                        value={tourRun.d10}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="5s">5s</label>
                        <input type="text" id="d5" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxLength="2"
                        value={tourRun.d5}
                        />
                </div>

                <div className="form-group ">
                        <label htmlFor="1s">1s</label>
                        <input type="text" id="d1" 
                        onChange={handleControlledInputChange}
                        required className="form-control" 
                        placeholder="Any" 
                        maxLength="2"
                        value={tourRun.d1}
                        />
                </div>
                
            </div>

            <div align="center">
            <table className="denomsTable">
                <thead>
                <tr><th colSpan="3">Crew: {crewAvailable.length}, 
                    <div className={checkVar ? '' : 'totalNo'}>
                    PD total: ${tourRun.perDiem*tourRun.daysOut}/${tourRun.perDiem*tourRun.daysOut*crewAvailable.length}
                    </div>
                </th></tr>
                    <tr>
                        <th>Denom</th>
                        <th>Each</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className="denomsTableCells">
                    <tr className="denomsTableCells">
                        <td className="denomsTableCells">100s</td>
                        <td className="denomsTableCells">{denArrState[0][2]}</td>
                        <td className="denomsTableCells">{denArrState[0][3]}</td>
                    </tr>
                    <tr className="denomsTableCells">
                        <td className="denomsTableCells">50s</td>
                        <td className="denomsTableCells">{denArrState[1][2]}</td>
                        <td className="denomsTableCells">{denArrState[1][3]}</td>
                    </tr>
                    <tr className="denomsTableCells">
                        <td className="denomsTableCells">20s</td>
                        <td className="denomsTableCells">{denArrState[2][2]}</td>
                        <td className="denomsTableCells">{denArrState[2][3]}</td>
                    </tr>
                    <tr className="denomsTableCells">
                        <td className="denomsTableCells">10s</td>
                        <td className="denomsTableCells">{denArrState[3][2]}</td>
                        <td className="denomsTableCells">{denArrState[3][3]}</td>
                    </tr>
                    <tr className="denomsTableCells">
                        <td className="denomsTableCells">5s</td>
                        <td className="denomsTableCells">{denArrState[4][2]}</td>
                        <td className="denomsTableCells">{denArrState[4][3]}</td>
                    </tr>
                    <tr className="denomsTableCells">
                        <td className="denomsTableCells">1s</td>
                        <td className="denomsTableCells">{denArrState[5][2]}</td>
                        <td className="denomsTableCells">{denArrState[5][3]}</td>
                    </tr> 
                </tbody>
            </table>
 
            </div>
        </div>

        </div>
    )
    }