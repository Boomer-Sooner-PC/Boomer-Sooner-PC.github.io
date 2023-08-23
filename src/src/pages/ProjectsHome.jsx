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
                <div className="software-projects">
<div className="project correlations-in-allrecipes"><a href="/projects/correlations-in-allrecipes"><h3>Correlations In Allrecipes</h3></a></div>
<div className="project one-pizza-team-calculator"><a href="/projects/one-pizza-team-calculator"><h3>One Pizza Team Calculator</h3></a></div>
<div className="project ranked-choice-voting-website"><a href="/projects/ranked-choice-voting-website"><h3>Ranked Choice Voting Website</h3></a></div>
<div className="project school-points-system"><a href="/projects/school-points-system"><h3>School Points System</h3></a></div>
</div>
                <h1>Hardware</h1>
                <div className="hardware-projects">
<div className="project tic-tac-toe-robot"><a href="/projects/tic-tac-toe-robot"><h3>Tic Tac Toe Robot</h3></a></div>
<div className="project WiFi-Controlled-LED-Sign"><a href="/projects/WiFi-Controlled-LED-Sign"><h3>WiFi Controlled LED Sign</h3></a></div>
</div>
                <h1>Competition</h1>
                <div className="competition-projects">
<div className="project Carbon-Consulting--HackDFW2022"><a href="/projects/Carbon-Consulting--HackDFW2022"><h3>Carbon Consulting  HackDFW2022</h3></a></div>
<div className="project Educators-Exchange--RISDxACM-Hackathon"><a href="/projects/Educators-Exchange--RISDxACM-Hackathon"><h3>Educators Exchange  RISDxACM Hackathon</h3></a></div>
<div className="project SquirrelSpace--TAMUHack2023"><a href="/projects/SquirrelSpace--TAMUHack2023"><h3>SquirrelSpace  TAMUHack2023</h3></a></div>
</div>
                {/* competition */}
            </div>
        );
    }
}
