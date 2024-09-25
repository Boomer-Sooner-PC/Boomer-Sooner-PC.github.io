import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Home from "pages/Home";
import About from "pages/About";
import ProjectsRouter from "pages/ProjectsRouter";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        // <Router>
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home></Home>} />
                <Route path="/about" element={<About></About>} />
                <Route
                    path="/projects/*"
                    element={<ProjectsRouter></ProjectsRouter>}
                />
            </Routes>
        </AnimatePresence>
        // </Router>
    );
}

export default AnimatedRoutes;
