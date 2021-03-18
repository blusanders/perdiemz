import React, { useContext, useEffect } from "react";
import { CrewContext } from "./CrewProvider";
import { CrewCard } from "./CrewCard";

export const CrewList = () => {

    const { crew, getCrew } = useContext(CrewContext)

    useEffect(() => {
        getCrew()
    }, [])

    return (
        crew.map(crewMember => {
            return <CrewCard key={crew.id} crew={crewMember} />
        }
        )
    )
}
