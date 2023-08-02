import "./css/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/About";
import Astronomy from "pages/Astronomy";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/astronomy" element={<Astronomy />} />
                <Route path="*" element={<h1>404</h1>} />
            </Switch>
        </Router>
    );
}

export default App;
