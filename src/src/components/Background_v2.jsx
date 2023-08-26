import React, { useEffect, useRef } from "react";
import "../css/Background.css";

export default function Background() {
    const z1 = useRef(null);
    const z2 = useRef(null);
    const z3 = useRef(null);
    const rev = useRef([]);

    useEffect(() => {
        const ratio = 0.05;
        let x = 0;
        let y = 0;

        const animate = () => {
            const translateValue = `${x * ratio}px, ${y * ratio}px`;
            const rotateValue1 = `${217}deg`;
            const rotateValue2 = `${71}deg`;

            z1.current.style.transform = `translate(${translateValue})`;
            z2.current.style.transform = `translate(${translateValue}) rotate(${rotateValue1})`;
            z3.current.style.transform = `translate(${translateValue}) rotate(${rotateValue2})`;

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

                    if (rev.current.includes(className)) {
                        element.style.opacity =
                            parseFloat(element.style.opacity) + opacity;
                        if (parseFloat(element.style.opacity) >= 1) {
                            rev.current.splice(
                                rev.current.indexOf(className),
                                1
                            );
                        }
                    } else {
                        element.style.opacity =
                            parseFloat(element.style.opacity) - opacity;
                        if (parseFloat(element.style.opacity) <= 0) {
                            rev.current.push(className);
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
    }, []);

    return (
        <div id="background">
            <div className="bg">
                <div className="z-3" ref={z3}>
                    <div className="tile top-left animate-opacity freq-5"></div>
                    <div className="tile top-right animate-opacity freq-5"></div>
                    <div className="tile bottom-left animate-opacity freq-7"></div>
                    <div className="tile bottom-right animate-opacity freq-10"></div>
                </div>
                <div className="z-2" ref={z2}>
                    <div className="tile top-left animate-opacity freq-9 delay-2"></div>
                    <div className="tile top-right animate-opacity freq-5 delay-2"></div>
                    <div className="tile bottom-left animate-opacity freq-6 delay-4"></div>
                    <div className="tile bottom-right animate-opacity freq-10 delay-4"></div>
                </div>
                <div className="z-1" ref={z1}>
                    <div className="tile top-left animate-opacity freq-7 delay-2"></div>
                    <div className="tile top-right animate-opacity freq-5 delay-4"></div>
                    <div className="tile bottom-left animate-opacity freq-9 delay-2"></div>
                    <div className="tile bottom-right animate-opacity freq-5 delay"></div>
                </div>{" "}
                *
            </div>
        </div>
    );
}
