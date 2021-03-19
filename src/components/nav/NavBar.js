import React, { useState } from "react"
import { Link } from "react-router-dom"
import { authApi, userStorageKey } from "./../auth/authSettings"

import PerDiemzLogo from "./../../images/perDiemzLogo.jpg"
import "bootstrap/dist/css/bootstrap.min.css"

export const NavBar = (props) => {

  const LogOut = () => {
    if (window.confirm("Logout?")) {
      sessionStorage.setItem(userStorageKey, "")
    }
  }

  return (
    <nav className="navbar bg-custom-2 bg-white">

      <ul className="nav nav-pills nav-fill">
        <li className="navbar-brand">
          <Link className="nav-link" to="/"><img src={PerDiemzLogo} width="100"></img></Link>
        </li>
        <li className="nav-item text-black">
          <Link className="nav-link link-secondary" to="/crew">Crew</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tourrun">Tour Runz</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reports">Reportz</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={LogOut}>Logout</Link>
        </li>
      </ul>
    </nav>
  )
}
