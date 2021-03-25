    import React, { useContext, useEffect, useState } from "react"
    import { useHistory, useParams } from 'react-router-dom';

    import { TourContext } from "./TourProvider";

    import "./Tour.css"
    import { Button } from 'reactstrap';

    export const TourForm = () => {
    const { getTours, addTour, getTourById, updateTour, deleteTour } = useContext(TourContext)

    //create empty state var to hold form values
    const [tour, setTour] = useState({
        userId: parseInt(sessionStorage.getItem("app_user_id")), 
        name: "",
        dateStart: "",
        dateEnd: ""
    })

    //create state var to stop quick clicks on edits
    const [isLoading, setIsLoading] = useState(true);

    const [validMsg, setValidMsg] = useState("");

    //get tourId from URL if there
    const { tourId } = useParams();

    //can useEffect monitor the URL for changes?
    // useEffect(() => {}, [tourId])


    const history = useHistory();

    //update state on every field change
    const handleControlledInputChange = (event) => {
        const newTour = { ...tour }
        newTour[event.target.id] = event.target.value
        setTour(newTour)
    }

    const handleDeleteTour = (event) => {
        if(window.confirm("Are you sure?")===true){
        deleteTour(event.target.id)
        .then(() => {
            history.push("/tour")
        })
        }
    }

    const handleSaveTour = () => {
        let validForm=false
        let validMsgString=""

        if (tour.name.length === 0) {
            validMsgString = "Name required."
        }else{
            validForm=true
        }
    
        
        if (validForm===false) {
            window.alert(validMsgString)
        } else {
        //disable the button - no extra clicks
        setIsLoading(true);

        debugger
        //if params has tourId then UPDATE else ADD
        if (tourId){
            //PUT - update
            updateTour({
                id: tour.id,
                userId: tour.userId, 
                name: tour.name,
                dateStart: tour.dateStart,
                dateEnd: tour.dateEnd
            })
            .then(() => history.push(`/tour`))
        }else {
            //POST - add
            addTour({
                userId: tour.userId, 
                name: tour.name,
                dateStart: tour.dateStart,
                dateEnd: tour.dateEnd
            })
            .then(setTour({  //reset state obj as blank to zero out add form
                name: "",
                dateStart: "",
                dateEnd: ""
            }))
            .then(setIsLoading(false))
            .then(() => history.push("/tour"))
        }
        }
    }

    // Get customers and locations. If tourId is in the URL, getTourById
    useEffect(() => {
        getTours()
        .then(() => {
            // debugger
        if (tourId) {
            getTourById(tourId)
            .then(tour => {
                setTour(tour)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
        })
    }, [])

    return (
        <div>
        <form className="tourForm ">
        <h2 className="tourForm__title">{tourId ? "Edit Tourz" : "Add Tourz"}</h2>

            <fieldset>
            <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required autoFocus className="form-control"
            placeholder="Name"
            onChange={handleControlledInputChange}
            value={tour.name}/>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
            <label htmlFor="dateStart">Date Start: </label>
            <input type="text" id="dateStart" required className="form-control"
            placeholder="Date Start"
            onChange={handleControlledInputChange}
            value={tour.dateStart}/>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
            <label htmlFor="dateStart">Date End: </label>
            <input type="text" id="dateEnd" required className="form-control"
            placeholder="Date Start"
            onChange={handleControlledInputChange}
            value={tour.dateEnd}/>
            </div>
        </fieldset>

        <button className="btn btn-secondary"
            type="submit"
            disabled={isLoading}
            onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveTour()
            }}>

            {/* show ADD or SAVE if adding or editing  */}
            {tourId ? "Save Tour" : "Add Tour"}

        </button>
        <div className="divider"/>
        {/* only show delete button if editing */}
        {tourId ?
        <button type="button" id={tourId} className="btn btn-secondary" onClick={handleDeleteTour}>
            Delete Tour
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