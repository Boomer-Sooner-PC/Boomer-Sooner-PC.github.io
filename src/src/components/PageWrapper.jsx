import React from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import BackgroundAnimation from "./BackgroundAnimation";

import "../css/PageWrapper.css";

export default class PageWrapper extends React.Component {
    componentWillUnmount() {
        console.log("PageWrapper unmounted");
        document.getElementById("PageWrapper").classList += " fade-out";
    }

    render() {
        return (
            <div id="PageWrapper">
                <div id="navbar-container">
                    <Navbar id="navbar-element">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/about" className="nav-link">
                            About
                        </NavLink>
                        <NavLink to="/contact" className="nav-link">
                            Contact
                        </NavLink>
                        <NavLink to="/astrophotography" className="nav-link">
                            Astrophotography
                        </NavLink>
                        <NavLink to="/projects" className="nav-link">
                            Projects
                        </NavLink>
                    </Navbar>
                </div>
                <motion.div
                    id="content-container"
                    initial={{
                        opacity: 0,
                        translateY: 100,
                        transition: { duration: 0.25 },
                    }}
                    animate={{
                        opacity: 1,
                        translateY: 0,
                        transition: { duration: 0.25 },
                    }}
                    exit={{
                        opacity: 0,
                        translateY: -100,
                        transition: { duration: 0.25 },
                    }}>
                    {this.props.children}
                </motion.div>
            </div>
        );
    }
}
