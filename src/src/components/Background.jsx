import React from "react";
import $ from "jquery";
import "../css/Background.css";

import starImage from "../images/star.png";

export default class Background extends React.Component {
    componentDidMount() {
        "use strict";
        const z1 = document.getElementsByClassName("z-1")[0];
        const z2 = document.getElementsByClassName("z-2")[0];
        const z3 = document.getElementsByClassName("z-3")[0];
        const ratio = 0.05;
        let x = 0;
        let y = 0;

        requestAnimationFrame(function animation() {
            z1.style.transform =
                "translate(" + x * ratio + "px," + y * ratio + "px)";
            z2.style.transform =
                "translate(" +
                (x * ratio) / 2 +
                "px," +
                (y * ratio) / 2 +
                "px) rotate(217deg)";
            z3.style.transform =
                "translate(" +
                (x * ratio) / 3 +
                "px," +
                (y * ratio) / 3 +
                "px) rotate(71deg)";
            requestAnimationFrame(animation);
        });
    }

    render() {
        return (
            <div id="background">
                <div class="bg">
                    <div class="z-3">
                        <div class="tile top-left animate-opacity freq-5"></div>
                        <div class="tile top-right animate-opacity freq-5"></div>
                        <div class="tile bottom-left animate-opacity freq-7"></div>
                        <div class="tile bottom-right animate-opacity freq-10"></div>
                    </div>
                    <div class="z-2">
                        <div class="tile top-left animate-opacity freq-9 delay-2"></div>
                        <div class="tile top-right animate-opacity freq-5 delay-2"></div>
                        <div class="tile bottom-left animate-opacity freq-6 delay-4"></div>
                        <div class="tile bottom-right animate-opacity freq-10 delay-4"></div>
                    </div>
                    <div class="z-1">
                        <div class="tile top-left animate-opacity freq-7 delay-2"></div>
                        <div class="tile top-right animate-opacity freq-5 delay-4"></div>
                        <div class="tile bottom-left animate-opacity freq-9 delay-2"></div>
                        <div class="tile bottom-right animate-opacity freq-5 delay"></div>
                    </div>
                </div>
            </div>
        );
    }
}
