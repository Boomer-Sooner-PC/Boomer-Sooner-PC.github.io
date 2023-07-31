import React from "react";

import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

export default class NavBar extends React.Component {
    componentDidMount() {
        let activeCoords = {
            x: 0,
            y: 0,
        };

        let active = document.getElementsByClassName("active")[0];

        // get active coords
        activeCoords.x = active.getBoundingClientRect().x;
        activeCoords.y = active.getBoundingClientRect().y;
        let activeWidth = active.getBoundingClientRect().width;
        let activeHeight = active.getBoundingClientRect().height;

        activeCoords.x = activeCoords.x + activeWidth / 2;
        activeCoords.y = activeCoords.y + activeHeight * 0.8;

        // set marker position
        let marker = document.getElementById("marker");
        marker.style.left = activeCoords.x + "px";
        marker.style.top = activeCoords.y + "px";

        // set height of market to the top of the marker to the bottom of the navbar
        let navbar = document.getElementById("navbar");
        let navbarBottom = navbar.getBoundingClientRect().bottom;
        marker.style.height = navbarBottom - activeCoords.y + "px";

        // get bottom of marker y coord
        let markerBottom = marker.getBoundingClientRect().bottom;
        document.getElementById("line").style.top = markerBottom + "px";
    }
    render() {
        return (
            // bootstrap navbar
            <Navbar expand="lg" id="navbar">
                <Navbar.Brand href="/">Michael Manders</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" id="links">
                        {/* Use NavLink instead of Nav.Link */}
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/about" className="nav-link">
                            About
                        </NavLink>
                        <div id="marker"></div>
                        <div id="line"></div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
