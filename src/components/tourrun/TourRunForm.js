    import React, { useContext, useEffect, useState } from "react"
    import { useHistory, useParams } from 'react-router-dom';

    import { TourRunContext } from "./TourRunProvider";

    import "./TourRun.css"
    import { Button } from 'reactstrap';

    export const TourRunForm = () => {
    const { getTourRuns, addTourRun, getTourRunById, deleteTourRun } = useContext(TourRunContext)

    //create empty state var to hold form values
    const [tourRun, setTourRun] = useState({
    tourId: 0
    name: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    timeLeave: "",
    timeArrive: ""
    })

    //create state var to stop quick clicks on edits
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    //update state on every field change
    const handleControlledInputChange = (event) => {
        event.preventDefault()
        const newTourRun = { ...tourRun }
        newTourRun[event.target.id] = event.target.value
        setTourRun(newTourRun)
    }

    const handleDeleteTourRun = (event) => {
        console.log("Delete ID " + event.target.id)
        if(window.confirm("Are you sure?")===true){
        deleteTourRun(event.target.id)
        .then(() => {
        history.push("/tourRun")
        })
        }
    }

    const handleSaveTourRun = () => {
        let validForm=false
        let validMsgString=""

        if (tourRun.firstName.length === 0) {
        validMsgString = "First name required."
        }else{
        if (tourRun.lastName.length === 0) {
            validMsgString += "Last name required."
        }else{
            if (tourRun.title.length === 0) {
            validMsgString += "Title is required."
            }else{
            if (parseInt(tourRun.tourRunTypeId) === 0) {
                validMsgString += "TourRun Type is required."
            }else{validForm=true
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
                firstName: tourRun.firstName,
                lastName: tourRun.lastName,
                title: tourRun.title,
                tourRunTypeId: parseInt(tourRun.tourRunTypeId)
            })
            .then(() => history.push(`/tourRun`))
        }else {
            //POST - add
            addTourRun({
            name: tourRun.name,
            description: tourRun.description,
            dateStart: tourRun.dateStart,
            dateEnd: tourRun.dateEnd,
            timeLeave: tourRun.timeLeave,
            timeArrive: tourRun.timeArrive,
            tourId: parseInt(tourRun.tourId)
            })
            .then(setTourRun({  //reset state obj as blank to zero out add form
            name: "",
            description: "",
            dateStart: "",
            dateEnd: "",
            timeLeave: "",
            timeArrive: "",
            tourId: 0
            }))
            .then(setIsLoading(false))
            .then(() => history.push("/tourRun"))
        }
        }
    }

    // Get customers and locations. If tourRunId is in the URL, getTourRunById
    useEffect(() => {
        getTours()
        .then(getCrew)
        .then(setIsLoading(false))
    }, [])

    return (
        <div>
        <form className="tourRunForm">
        <h2 className="tourRunForm__title">{tourRunId ? "" : "Add TourRun"}</h2>

        {validMsg.length > 0 ? "" : validMsg}

        <fieldset>
            <div className="form-group">
            <label htmlFor="location">Tour: </label>
            <select value={tourRuns.tourId} id="tourId" className="form-control" 
            onChange={handleControlledInputChange}>
                <option value="0">Select a Tour</option>
                {tours.map(l => (
                <option key={l.id} value={l.id}>
                    {l.name}
                </option>
                ))}
            </select>
            </div>
        </fieldset>
                    <fieldset>
            <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required autoFocus className="form-control"
            placeholder="Tour Run Name"
            onChange={handleControlledInputChange}
            value={tourRun.name}/>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" required className="form-control"
            placeholder="Last Name"
            onChange={handleControlledInputChange}
            value={tourRun.description}/>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="dateStart">Date Start:</label>
                <input type="text" id="dateStart" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="Start Date" 
                value={tourRun.dateStart}/>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="dateEnd">Date Start:</label>
                <input type="text" id="dateEnd" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="End Date" 
                value={tourRun.dateEnd}/>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="timeLeave">Leave Time:</label>
                <input type="text" id="timeLeave" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="Leave Time" 
                value={tourRun.timeLeave}/>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="timeArrive">Arrive Time:</label>
                <input type="text" id="timeArrive" 
                onChange={handleControlledInputChange}
                required className="form-control" 
                placeholder="Arrival Time" 
                value={tourRun.timeArrive}/>
            </div>
        </fieldset>

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

    </div>
    )
    }