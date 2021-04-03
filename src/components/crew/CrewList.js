import React, { useState, useContext, useEffect } from "react";
import { CrewContext } from "./CrewProvider";
import { CrewCard } from "./CrewCard";

export const CrewList = () => {

    const { crew, getCrew } = useContext(CrewContext)
    const [crewTotalAvailable, setCrewTotalAvailable ] = useState()

    useEffect(() => {
        getCrew()
    }, [])

    useEffect(()=>{
        setCrewTotalAvailable(crew.filter(crewMember => crewMember.available === true).length)
    },[crew])

    return (

        <>
            <h2>All Crewz ({crewTotalAvailable} avail)</h2>
                        
            <div className="crewCardHeader">
                <div>Name</div>
                <div>Title</div>
                <div></div>
            </div>


            {
            crew.map(crewMember => {
                return <CrewCard key={crewMember.id} crew={crewMember} />
            })
            }
        </>
    )
}
