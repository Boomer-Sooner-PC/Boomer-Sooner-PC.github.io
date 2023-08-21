import React from "react";
import NavBar from "components/NavBar";
import Background from "components/Background";
import "../css/Home.css";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.scrollAmount = 0;
    }

    componentDidMount() {
        // Add the event listeners when the component mounts
        window.addEventListener("wheel", this.handleWheelEvent, {
            passive: false,
        });
        window.addEventListener("touchmove", this.handleTouchMoveEvent, {
            passive: false,
        });
        this.updateOrbits();
        this.updateMoons();
    }

    componentWillUnmount() {
        // Remove the event listeners when the component unmounts
        window.removeEventListener("wheel", this.handleWheelEvent);
        window.removeEventListener("touchmove", this.handleTouchMoveEvent);
    }

    handleWheelEvent = (event) => {
        event.preventDefault();
        const dir = event.deltaY;
        this.updateScrollAmount(dir / 10);
    };

    handleTouchMoveEvent = (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        const dir = touch.pageY - this.scrollAmount;
        this.updateScrollAmount(dir / 20);
    };

    updateScrollAmount = (dir) => {
        this.scrollAmount += dir / 5;
        if (this.scrollAmount > 360) {
            this.scrollAmount = Math.abs(this.scrollAmount - 360);
        }
        if (this.scrollAmount < 0) {
            this.scrollAmount = Math.abs(this.scrollAmount + 360);
        }
        this.updateOrbits();
        this.updateMoons();
    };

    updateOrbits = () => {
        try {
            const planet = document.getElementById("planet");
            planet.style.transform = `rotate(${this.scrollAmount}deg)`;
        } catch (e) {}
    };

    updateMoons = () => {
        const moons = document.getElementsByClassName("moon");
        const separation = 360 / moons.length;

        const distanceFromMoon = 80; // vw

        for (let i = 0; i < moons.length; i++) {
            const angle = (i * separation + this.scrollAmount) % 360;
            const x = Math.cos((angle * Math.PI) / 180) * distanceFromMoon;
            const y = Math.sin((angle * Math.PI) / 180) * distanceFromMoon;

            let elm_width = moons[i].offsetWidth;
            let elm_height = moons[i].offsetHeight;

            moons[i].style.left = `calc(${x - 20}vw - ${
                elm_width / 2
            }px + 2vw)`;
            moons[i].style.top = `calc(${y + "vw"} + 50vh - ${
                elm_height / 2
            }px)`;
        }
    };

    render() {
        return (
            <div
                className="home"
                style={{
                    overflow: "hidden",
                    display: "block",
                    width: "100%",
                    height: "100%",
                }}>
                <Background />

                <div id="planet-container">
                    <div id="planet"></div>
                    <div id="moons">
                        <div className="moon" id="moon-1">
                            <h1 id="title">Michael Manders</h1>
                        </div>
                        <div className="moon" id="moon-2"></div>
                        <div className="moon" id="moon-3"></div>
                        <div className="moon" id="moon-4"></div>
                        <div className="moon" id="moon-5"></div>
                        <div className="moon" id="moon-6"></div>
                    </div>
                </div>
                <NavBar />
            </div>
        );
    }
}
//
