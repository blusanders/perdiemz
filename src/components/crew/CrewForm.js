import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';

import { CrewContext } from "./CrewProvider";
import { CrewTypeContext } from "../CrewType/CrewTypeProvider";

import "./Crew.css"
import { Button } from 'reactstrap';

export const CrewForm = () => {
  const { addCrew, getCrewById, updateCrew } = useContext(CrewContext)
  const { crewType, getCrewType, addCrewType, getCrewTypeById, updateCrewType } = useContext(CrewTypeContext)

  //create empty state var to hold form values
  const [crew, setCrew] = useState({
      firstName: "",
      lastName: "",
      title: "",
      crewTypeId: 0
    })

    //create state var to stop quick clicks on edits
    const [isLoading, setIsLoading] = useState(true);

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
      if (parseInt(crew.locationId) === 0) {
          window.alert("Please select a location")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an crew
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
      debugger
      getCrewType().then(() => {
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
              {crewType.map(l => (
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