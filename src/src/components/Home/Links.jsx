import React from "react";

import "../../css/Links-Moon.css";

import github from "../../images/link-images/github.png";
import instagram from "../../images/link-images/instagram.png";
import astrobin from "../../images/link-images/astrobin.png";
import youtube from "../../images/link-images/youtube.png";

export default class Links extends React.Component {
    componentDidMount() {
        // event listener fror all the links
        for (let elm of document
            .getElementById("links-moon")
            .querySelectorAll(".link")) {
            // console.log(elm);
            elm.addEventListener("click", () => {
                window.open(elm.dataset.link, "_blank");
            });
        }
    }

    render() {
        return (
            <div id="links-moon">
                <h2 id="links">Follow Me!</h2>
                <div id="links-container">
                    <div
                        className="link"
                        data-link="https://github.com/michael-manders">
                        <img src={github} alt="GitHub Logo" />
                        {/* <div className="title">GitHub</div> */}
                    </div>
                    <div
                        className="link"
                        data-link="https://www.instagram.com/fuelratting/">
                        <img src={instagram} alt="Instagram Logo" />
                        {/* <div className="title">Instagram</div> */}
                    </div>
                    <div
                        className="link"
                        data-link="https://www.astrobin.com/users/FuelRatting/">
                        <img src={astrobin} alt="AstroBin logo" />
                        {/* <div className="title">AstroBin</div> */}
                    </div>
                    <div
                        className="link"
                        data-link="https://www.youtube.com/channel/UCUkJ0Vb41W4-Sm-N211CctA">
                        <img src={youtube} alt="YouTube Logo" />
                        {/* <div className="title">YouTube</div> */}
                    </div>
                </div>
            </div>
        );
    }
}
