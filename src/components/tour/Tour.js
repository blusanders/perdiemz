import React, { useState, useContext, useEffect }  from "react";
import "./Tour.css"
import { TourForm } from "./TourForm";
import { TourList } from "./TourList";

export const Tour = () => {

    return (
        <div className="container__tour">

            <div className="containerHeader">
                <h1><i>Tourz</i></h1>
            </div>

            <div className="container__tourSideMain">

                <div className="container__tourSide">
                    
                    <h2>All Tourz</h2>
                    
                    <div className="tourCardHeader">
                        <div>Tour Name</div>
                        <div>Date Start</div>
                        <div>Date End</div>
                    </div>

                    <TourList />

                </div>

                <div className="container__tourMain">
                    <TourForm />
                </div>

            </div>

        </div>
    )
}