import React from "react";
import NavBar from "components/NavBar";
import Background from "components/Background";
import "../css/Home.css";

export default class Home extends React.Component {
    componentDidMount() {
        let scrollAmmount = 0; // used for tracking scroll to do the orbitals

        // log scroll ammount
        window.addEventListener(
            "wheel",
            (event) => {
                event.preventDefault();
                let dir = event.deltaY;
                // scrollAmmount += dir;
                updateScrollAmount(dir / 10);
            },
            { passive: false }
        );

        window.addEventListener(
            "touchmove",
            (event) => {
                event.preventDefault();
                let touch = event.touches[0];
                let dir = touch.pageY - scrollAmmount;
                updateScrollAmount(dir / 20);
            },
            { passive: false }
        );

        function updateScrollAmount(dir) {
            scrollAmmount += dir / 5;
            if (scrollAmmount > 360) {
                scrollAmmount = Math.abs(scrollAmmount - 360);
            }
            if (scrollAmmount < 0) {
                scrollAmmount = Math.abs(scrollAmmount + 360);
            }
            updateOrbits();
            updateMoons();
        }

        function updateOrbits() {
            try {
                let planet = document.getElementById("planet");
                planet.style.transform = "rotate(" + scrollAmmount + "deg)";
            } catch (e) {}
        }

        function updateMoons() {
            let moons = document.getElementsByClassName("moon");
            let separation = 360 / moons.length;

            let distanceFromMoon = 80; // vw

            for (let i = 0; i < moons.length; i++) {
                let angle = i * separation + scrollAmmount;
                angle = angle % 360;
                let x = Math.cos(angle * (Math.PI / 180)) * distanceFromMoon;
                let y = Math.sin(angle * (Math.PI / 180)) * distanceFromMoon;

                moons[i].style.left = x - 20 + "vw";
                moons[i].style.top = `calc(${y + "vw"} + 50vh)`;
            }
        }
        try {
            updateMoons();
        } catch (e) {}
    }
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
                            <h1>Moon 1</h1>
                        </div>
                        <div className="moon" id="moon-2"></div>
                        <div className="moon" id="moon-3"></div>
                        <div className="moon" id="moon-4"></div>
                        <div className="moon" id="moon-5"></div>
                        <div className="moon" id="moon-6"></div>
                    </div>
                </div>

                <NavBar />
                <h1 style={{ color: "white", overflow: "hidden" }} id="title">
                    Home
                </h1>
            </div>
        );
    }
}
//
