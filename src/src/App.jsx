import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/About";
import Astrophotography from "pages/Astrophotography";
import SecretRouter from "pages/hidden/SecretRouter";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route
                    path="/astrophotography"
                    element={<Astrophotography />}
                />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>404</h1>} />
                {/* if contains hidden redirect to hidden router */}
                <Route path="/hidden/*" element={<SecretRouter />} />
            </Routes>
        </Router>
    );
}

export default App;
