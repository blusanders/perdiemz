import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';

import { CrewContext } from "./CrewProvider";
import { CrewTypeContext } from "../CrewType/CrewTypeProvider";
import { TourContext } from "../tour/TourProvider";

import "./Crew.css"
import { Button } from 'reactstrap';

export const CrewForm = () => {
  const { addCrew, getCrewById, updateCrew } = useContext(CrewContext)
  const { crewTypes, getCrewTypes } = useContext(CrewTypeContext)
  const { tour, getTours} = useContext(TourContext)

  //create empty state var to hold form values
  const [crew, setCrew] = useState({
      firstName: "",
      lastName: "",
      title: "",
      crewTypeId: 0
    })

    //create state var to stop quick clicks on edits
    const [isLoading, setIsLoading] = useState(true);

    const [validMsg, setValidMsg] = useState("");

    //get crewId from URL if there
    const { crewId } = useParams();
    const history = useHistory();

    //update state on every field change
    const handleControlledInputChange = (event) => {
      const newCrew = { ...crew }
      newCrew[event.target.id] = event.target.value
      setCrew(newCrew)
    }

    const handleSaveCrew = () => {
      let validForm=false

      if (crew.firstName.length === 0) {
        setValidMsg(validMsg+"<div>First name required.</div>")
      }else{
        validForm=true
      }

      if (parseInt(crew.crewTypeId) === 0) {
        setValidMsg(validMsg+"<div>Crew type required.</div>")
      }else{
        validForm=true
      }

      if (validForm===false) {
        window.alert("All items required")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);

        //if params has crewId
        if (crewId){
          //PUT - update
          updateCrew({
              id: crew.id,
              firstName: crew.firstName,
              lastName: crew.lastName,
              title: crew.title,
              crewTypeId: parseInt(crew.crewTypeId)
          })
          .then(() => history.push(`/crew/detail/${crew.id}`))
        }else {
          //POST - add
          addCrew({
            firstName: crew.firstName,
            lastName: crew.lastName,
            title: crew.title,
            crewTypeId: parseInt(crew.crewTypeId)
          })
          .then(() => history.push("/crew"))
        }
      }
    }

    // Get customers and locations. If crewId is in the URL, getCrewById
    useEffect(() => {
      getCrewTypes()
      .then(() => {
        if (crewId) {
          getCrewById(crewId)
          .then(crew => {
              setCrew(crew)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    return (
      <form className="crewForm">
        <h2 className="crewForm__title">{crewId ? "Edit Crew" : "Add Crew"}</h2>

        {validMsg.length > 0 ? "" : validMsg}

          <fieldset>
          <div className="form-group">
            <label htmlFor="crewName">First: </label>
            <input type="text" id="firstName" required autoFocus className="form-control"
            placeholder="First Name"
            onChange={handleControlledInputChange}
            value={crew.firstName}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="crewName">Last name: </label>
            <input type="text" id="lastName" required autoFocus className="form-control"
            placeholder="Last Name"
            onChange={handleControlledInputChange}
            value={crew.firstName}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
              <label htmlFor="breed">Title:</label>
              <input type="text" id="title" 
              onChange={handleControlledInputChange}
              required autoFocus className="form-control" 
              placeholder="Title" 
              value={crew.title}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="location">Crew Type: </label>
            <select value={crew.crewTypeId} id="crewTypeId" className="form-control" 
            onChange={handleControlledInputChange}>
              <option value="0">Select a Crew Type</option>
              {crewTypes.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <button className="btn btn-secondary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveCrew()
          }}>
        {crewId ? "Save Crew" : "Add Crew"}</button>
      </form>
    )
}