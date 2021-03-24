import React from "react";
import { Route } from "react-router-dom";

import { Home } from "./Home";

import { Crew } from "./crew/Crew";
import { CrewProvider } from "./crew/CrewProvider";
import { CrewTypeProvider } from "./CrewType/CrewTypeProvider";

import { TourRun } from "./tourrun/TourRun";
import { TourRunProvider } from "./tourrun/TourRunProvider";
import { TourProvider } from "./tour/TourProvider";
import { Tour } from "./tour/Tour";
import { TourRunCrewProvider } from "./tourRunCrew/TourRunCrewProvider";

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

            <Route exact path="/tour">
                <TourProvider>
                    <Tour />
                </TourProvider>
            </Route>

            <Route exact path="/tour/:tourId(\d+)">
                <TourProvider>
                        <Tour />
                </TourProvider>
            </Route>
                        <Route exact path="/tourrun">
                <CrewProvider>
                <TourRunCrewProvider>
                <TourProvider>
                    <TourRunProvider>
                            <TourRun />
                    </TourRunProvider>
                    </TourProvider>
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
            <TourRunCrewProvider>
                <TourRunProvider>
                            <TourProvider>
                                <Reports />
                            </TourProvider>
                        </TourRunProvider>
            </TourRunCrewProvider>
            </CrewProvider>
            </Route>
        </>
    );
};

