import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProjectHome from "./ProjectsHome";
// start import
import BINGOPARADOXSIM from "../pages/projects/Bingo-Paradox-Sim";
import BLACKJACKTRAINER from "../pages/projects/Blackjack-Trainer";
import BOIDS from "../pages/projects/boids";
import CARBONCONSULTINGHACKDFW2022 from "../pages/projects/Carbon-Consulting--HackDFW2022";
import CORRELATIONSINALLRECIPES from "../pages/projects/correlations-in-allrecipes";
import EDUCATORSEXCHANGERISDXACMHACKATHON from "../pages/projects/Educators-Exchange--RISDxACM-Hackathon";
import MOONPHASECHART from "../pages/projects/Moon-Phase-Chart";
import OAKOPERATIONSHACKSMU2023 from "../pages/projects/Oak-Operations--HackSMU2023";
import ONEPIZZATEAMCALCULATOR from "../pages/projects/one-pizza-team-calculator";
import RANKEDCHOICEVOTINGWEBSITE from "../pages/projects/ranked-choice-voting-website";
import SCHOOLPOINTSSYSTEM from "../pages/projects/school-points-system";
import SQUIRRELSPACETAMUHACK2023 from "../pages/projects/SquirrelSpace--TAMUHack2023";
import TICTACTOEROBOT from "../pages/projects/tic-tac-toe-robot";
import TIMETRACKINGRENDERER from "../pages/projects/Time-Tracking-Renderer";
import WIFICONTROLLEDLEDSIGN from "../pages/projects/WiFi-Controlled-LED-Sign";
// end import

export default class SecretRouter extends React.Component {
    render() {
        return <Routes>
<Route path="/Bingo-Paradox-Sim" element={<BINGOPARADOXSIM />} />
<Route path="/Blackjack-Trainer" element={<BLACKJACKTRAINER />} />
<Route path="/boids" element={<BOIDS />} />
<Route path="/Carbon-Consulting--HackDFW2022" element={<CARBONCONSULTINGHACKDFW2022 />} />
<Route path="/correlations-in-allrecipes" element={<CORRELATIONSINALLRECIPES />} />
<Route path="/Educators-Exchange--RISDxACM-Hackathon" element={<EDUCATORSEXCHANGERISDXACMHACKATHON />} />
<Route path="/Moon-Phase-Chart" element={<MOONPHASECHART />} />
<Route path="/Oak-Operations--HackSMU2023" element={<OAKOPERATIONSHACKSMU2023 />} />
<Route path="/one-pizza-team-calculator" element={<ONEPIZZATEAMCALCULATOR />} />
<Route path="/ranked-choice-voting-website" element={<RANKEDCHOICEVOTINGWEBSITE />} />
<Route path="/school-points-system" element={<SCHOOLPOINTSSYSTEM />} />
<Route path="/SquirrelSpace--TAMUHack2023" element={<SQUIRRELSPACETAMUHACK2023 />} />
<Route path="/tic-tac-toe-robot" element={<TICTACTOEROBOT />} />
<Route path="/Time-Tracking-Renderer" element={<TIMETRACKINGRENDERER />} />
<Route path="/WiFi-Controlled-LED-Sign" element={<WIFICONTROLLEDLEDSIGN />} />

    <Route path="*" element={<ProjectHome />} />
    </Routes>;
    }
}
