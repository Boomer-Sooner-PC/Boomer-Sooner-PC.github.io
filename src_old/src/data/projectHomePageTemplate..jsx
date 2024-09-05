import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";

import "../css/ProjectsHome.css";

export default class ProjectHome extends React.Component {
    render() {
        return (
            <div className="about">
                <Navbar />
                <Background />
                <h1>Projects</h1>
                <h1>Software</h1>
                <div class="software-projects"></div>
                <h1>Hardware</h1>
                <div class="hardware-projects"></div>
                <h1>Competition</h1>
                <div class="competition-projects"></div>
                {/* competition */}
            </div>
        );
    }
}
