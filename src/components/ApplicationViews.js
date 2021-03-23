import React from "react";
import { Route } from "react-router-dom";

import { Home } from "./Home";

import { Crew } from "./crew/Crew";
import { CrewProvider } from "./crew/CrewProvider";
import { CrewTypeProvider } from "./CrewType/CrewTypeProvider";

import { TourRun } from "./tourrun/TourRun";
import { TourRunProvider } from "./tourrun/TourRunProvider";
import { TourProvider } from "./tour/TourProvider";
import { TourRunCrewProvider } from "./tourruncrew/TourRunCrewProvider";

import { Reports } from "./reports/Reports";


export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            
            <Route exact path="/crew">

                <TourProvider>
                    <CrewProvider>
                        <CrewTypeProvider>
                            <Crew />
                        </CrewTypeProvider>
                    </CrewProvider>
                </TourProvider>
            </Route>

            <Route exact path="/crew/:crewId(\d+)">
                <CrewProvider>
                    <CrewTypeProvider>
                        <Crew />
                    </CrewTypeProvider>
                </CrewProvider>
            </Route>

            <Route exact path="/tourrun">
                <CrewProvider>
                <TourRunCrewProvider>
                    <TourRunProvider>
                        <TourProvider>
                            <TourRun />
                        </TourProvider>
                    </TourRunProvider>
                    </TourRunCrewProvider>
                </CrewProvider>
            </Route>

            <Route exact path="/tourrun/:tourRunId(\d+)">
            <CrewProvider>
                    <TourRunCrewProvider>
                        <TourRunProvider>
                            <TourProvider>
                                <TourRun />
                            </TourProvider>
                        </TourRunProvider>
                    </TourRunCrewProvider>
                </CrewProvider>
            </Route>

            <Route exact path="/reports">
            <CrewProvider>
                <TourRunProvider>
                            <TourProvider>
                                <Reports />
                            </TourProvider>
                        </TourRunProvider>
            </CrewProvider>
            </Route>
        </>
    );
};

