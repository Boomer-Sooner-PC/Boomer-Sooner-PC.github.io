import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";

export default class About extends React.Component {
    render() {
        return (
            <div className="about">
                <Navbar />
                <Background />
                <h1>About</h1>
            </div>
        );
    }
}
