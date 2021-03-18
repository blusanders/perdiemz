import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';

import { CrewContext } from "./CrewProvider";
import { CrewTypeContext } from "../CrewType/CrewTypeProvider";

import "./Crew.css"
import { Button } from 'reactstrap';

export const CrewForm = () => {
  const { addCrew, getCrewById, updateCrew, deleteCrew } = useContext(CrewContext)
  const { crewTypes, getCrewTypes } = useContext(CrewTypeContext)

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

    //can useEffect monitor the URL for changes?
    // useEffect(() => {}, [crewId])


    const history = useHistory();

    //update state on every field change
    const handleControlledInputChange = (event) => {
      event.preventDefault()
      const newCrew = { ...crew }
      newCrew[event.target.id] = event.target.value
      setCrew(newCrew)
    }

    const handleDeleteCrew = (event) => {
      console.log("Delete ID " + event.target.id)
      if(window.confirm("Are you sure?")===true){
        deleteCrew(event.target.id)
        .then(() => {
        history.push("/crew")
        })
      }
    }

  const handleSaveCrew = () => {
      let validForm=false
      let validMsgString=""

      if (crew.firstName.length === 0) {
        validMsgString = "First name required."
      }else{
        if (crew.lastName.length === 0) {
          validMsgString += "Last name required."
        }else{
          if (crew.title.length === 0) {
            validMsgString += "Title is required."
          }else{
            if (parseInt(crew.crewTypeId) === 0) {
              validMsgString += "Crew Type is required."
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

        //if params has crewId then UPDATE else ADD
        if (crewId){
          //PUT - update
          updateCrew({
              id: crew.id,
              firstName: crew.firstName,
              lastName: crew.lastName,
              title: crew.title,
              crewTypeId: parseInt(crew.crewTypeId)
          })
          .then(() => history.push(`/crew`))
        }else {
          //POST - add
          addCrew({
            firstName: crew.firstName,
            lastName: crew.lastName,
            title: crew.title,
            crewTypeId: parseInt(crew.crewTypeId)
          })
          .then(setCrew({  //reset state obj as blank to zero out add form
            firstName: "",
            lastName: "",
            title: "",
            crewTypeId: 0
          }))
          .then(setIsLoading(false))
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
      <div>
      <form className="crewForm ">
        <h2 className="crewForm__title">{crewId ? "Edit Crew" : "Add Crew"}</h2>

        {validMsg.length > 0 ? "" : validMsg}

          <fieldset>
          <div className="form-group">
            <label htmlFor="crewName">First:</label>
            <input type="text" id="firstName" required autoFocus className="form-control"
            placeholder="First Name"
            onChange={handleControlledInputChange}
            value={crew.firstName}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="crewName">Last name: </label>
            <input type="text" id="lastName" required className="form-control"
            placeholder="Last Name"
            onChange={handleControlledInputChange}
            value={crew.lastName}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
              <label htmlFor="breed">Title:</label>
              <input type="text" id="title" 
              onChange={handleControlledInputChange}
              required className="form-control" 
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
          type="submit"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveCrew()
          }}>

          {/* show ADD or SAVE if adding or editing  */}
          {crewId ? "Save Crew" : "Add Crew"}

        </button>
        <div className="divider"/>
        {/* only show delete button if editing */}
        {crewId ?
        <button type="button" id={crewId} className="btn btn-secondary" onClick={handleDeleteCrew}>
          Delete Crew
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