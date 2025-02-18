import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
// import About from "pages/About";
// import Astrophotography from "pages/Astrophotography";
// import Projects from "pages/ProjectsRouter";
// import SecretRouter from "pages/hidden/SecretRouter";
// import CryLog from "pages/hidden/CryLog";
// import Testing from "pages/Testing";

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/about" element={<About />} />
                <Route
                    path="/astrophotography"
                    element={<Astrophotography />}
                />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/*" element={<Projects />} /> */}
                <Route path="/" element={<Home></Home>} />
                {/* <Route path="/testing" element={<Testing />}></Route>
                <Route path="*" element={<h1>404</h1>} />
                <Route path="/hidden/crylog" element={<CryLog />} />
                <Route path="/hidden" element={<SecretRouter />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
