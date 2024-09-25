import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProjectHome from "./ProjectsHome";
// start import

export default class SecretRouter extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="*" element={<ProjectHome />} />
            </Routes>
        );
    }
}
