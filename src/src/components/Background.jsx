import React from "react";
import "../css/Background.css";

export default class Background extends React.Component {
    componentDidMount() {
        const z1 = document.getElementsByClassName("z-1")[0];
        const z2 = document.getElementsByClassName("z-2")[0];
        const z3 = document.getElementsByClassName("z-3")[0];
        const ratio = 0.05;
        let x = 0;
        let y = 0;

        let rev = [];

        const animate = () => {
            const translateValue = `${x * ratio}px, ${y * ratio}px`;
            const rotateValue1 = `${217}deg`;
            const rotateValue2 = `${71}deg`;

            z1.style.transform = `translate(${translateValue})`;
            z2.style.transform = `translate(${translateValue}) rotate(${rotateValue1})`;
            z3.style.transform = `translate(${translateValue}) rotate(${rotateValue2})`;

            // opacities
            let classes = [
                "freq-5",
                "freq-6",
                "freq-7",
                "freq-8",
                "freq-9",
                "freq-10",
            ];

            for (let className of classes) {
                let elements = document.getElementsByClassName(className);
                let freq = parseInt(className.split("-")[1]);
                let opacity = freq / 1000;
                for (let element of elements) {
                    if (element.style.opacity === "") {
                        element.style.opacity = 0;
                    }

                    if (rev.includes(className)) {
                        element.style.opacity =
                            parseFloat(element.style.opacity) + opacity;
                        if (parseFloat(element.style.opacity) >= 1) {
                            rev.splice(rev.indexOf(className), 1);
                        }
                    } else {
                        element.style.opacity =
                            parseFloat(element.style.opacity) - opacity;
                        if (parseFloat(element.style.opacity) <= 0) {
                            rev.push(className);
                        }
                    }
                }
            }

            // delay
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 10);
        };

        requestAnimationFrame(animate);
    }

    render() {
        return (
            <React.StrictMode>
                <div id="background">
                    <div className="bg">
                        <div className="z-3">
                            <div className="tile top-left animate-opacity freq-5"></div>
                            <div className="tile top-right animate-opacity freq-5"></div>
                            <div className="tile bottom-left animate-opacity freq-7"></div>
                            <div className="tile bottom-right animate-opacity freq-10"></div>
                        </div>
                        <div className="z-2">
                            <div className="tile top-left animate-opacity freq-9 delay-2"></div>
                            <div className="tile top-right animate-opacity freq-5 delay-2"></div>
                            <div className="tile bottom-left animate-opacity freq-6 delay-4"></div>
                            <div className="tile bottom-right animate-opacity freq-10 delay-4"></div>
                        </div>
                        <div className="z-1">
                            <div className="tile top-left animate-opacity freq-7 delay-2"></div>
                            <div className="tile top-right animate-opacity freq-5 delay-4"></div>
                            <div className="tile bottom-left animate-opacity freq-9 delay-2"></div>
                            <div className="tile bottom-right animate-opacity freq-5 delay"></div>
                        </div>{" "}
                        *
                    </div>
                </div>
            </React.StrictMode>
        );
    }
}
