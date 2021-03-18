import React from "react";
import { Route } from "react-router-dom";

import { Home } from "./Home";

import { Crew } from "./crew/Crew";
import { CrewProvider } from "./crew/CrewProvider";

import { TourRun } from "./tourrun/TourRun";

import { Reports } from "./reports/Reports";
import { CrewTypeProvider } from "./CrewType/CrewTypeProvider";
import { TourProvider } from "./tour/TourProvider";
import { TourRunProvider } from "./tourrun/TourRunProvider";


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
                <TourRunProvider>
                    <TourRun />
                    </TourRunProvider>
            </Route>

            <Route exact path="/reports">
                <Reports />
            </Route>
        </>
    );
};

