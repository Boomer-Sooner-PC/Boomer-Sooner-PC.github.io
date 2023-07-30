import React from "react";

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar__links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>
        );
    }
}
