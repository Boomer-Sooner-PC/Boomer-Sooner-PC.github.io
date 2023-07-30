import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/About";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
