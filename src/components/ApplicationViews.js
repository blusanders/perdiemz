import React from "react";
import { Route } from "react-router-dom";

import { Home } from "./Home";

import { Crew } from "./crew/Crew";
import { CrewProvider } from "./crew/CrewProvider";

import { TourRun } from "./tourrun/TourRun";

import { Reports } from "./reports/Reports";
import { CrewTypeProvider } from "./CrewType/CrewTypeProvider";


export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/crew">

            <CrewProvider>
                <CrewTypeProvider>
                    <Crew />
                </CrewTypeProvider>
            </CrewProvider>
            </Route>

            <Route exact path="/tourrun">
                <TourRun />
            </Route>

            <Route exact path="/reports">
                <Reports />
            </Route>
        </>
    );
};

