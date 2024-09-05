import "./css/App.css";
import { BrowserRouter as Router } from "react-router-dom";

import AnimatedRoutes from "components/AnimatedRoutes";
import BackgroundAnimation from "components/BackgroundAnimation";

function App() {
    return (
        <div id="app">
            <div id="background-container">
                <div id="animation-container">
                    {true ? <BackgroundAnimation></BackgroundAnimation> : null}
                </div>
            </div>
            <Router>
                <AnimatedRoutes></AnimatedRoutes>
            </Router>
        </div>
    );
}

export default App;
