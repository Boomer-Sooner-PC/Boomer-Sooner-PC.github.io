import React from "react";

import "../css/AnimatedText.css";

export default class AnimatedText extends React.Component {
    constructor(props) {
        super(props);
        this.text = [];
        this.finalString = [];
        this.charSet =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    }

    componentDidMount() {
        this.text = this.props.children.split("");
        this.finalString = this.props.children.split("");

        if (this.props.dropdown) {
            setTimeout(() => {
                let interval = setInterval(() => {
                    if (this.text.length > 0) {
                        let char = this.text.shift();
                        let newElement = document.createElement("div");
                        newElement.classList.add("animated-text-letter");
                        newElement.classList.add("animated-text-drop-active");
                        newElement.innerHTML = char === " " ? "&nbsp;" : char;

                        let i = 0;
                        let randomInterval = setInterval(() => {
                            i++;

                            if (i > 20) {
                                newElement.innerHTML =
                                    char === " " ? "&nbsp" : char;
                                clearInterval(randomInterval);
                            } else {
                                let randChar =
                                    this.charSet[
                                        Math.floor(
                                            Math.random() * this.charSet.length
                                        )
                                    ];
                                newElement.innerHTML =
                                    char === " " ? "&nbsp" : randChar;
                            }
                        }, 15);

                        let element = document.getElementById(this.props.id);

                        element.appendChild(newElement);
                    } else {
                        clearInterval(interval);
                    }
                }, 25);
            }, 100);
        }

        if (this.props.hover) {
            document.addEventListener("mouseover", (e) => {
                let element = document.getElementById(this.props.id);

                if (element === null || element.children[0] === undefined) {
                    return;
                }

                let elementL = element.children[0].getBoundingClientRect().left;
                let mouseX = e.clientX;
                let elementR =
                    element.children[
                        element.children.length - 1
                    ].getBoundingClientRect().right;

                let percent = (mouseX - elementL) / (elementR - elementL);

                if (percent > 1) return;

                let center = Math.round(element.children.length * percent);

                let indexes = [center - 1, center, center + 1];
                if (indexes[0] < 0) {
                    indexes[0] = 0;
                }
                if (indexes[2] >= element.children.length) {
                    indexes[2] = element.children.length - 1;
                }

                try {
                    for (let i of indexes) {
                        if (
                            element.children[i].classList.contains(
                                "animated-text-running"
                            )
                        ) {
                            continue;
                        }

                        element.children[i].classList.add(
                            "animated-text-running"
                        );

                        let original = element.children[i].innerHTML;
                        let j = 0;
                        let interval = setInterval(() => {
                            j++;
                            let randChar =
                                this.charSet[
                                    Math.floor(
                                        Math.random() * this.charSet.length
                                    )
                                ];
                            element.children[i].innerHTML = randChar;
                            if (j > 10) {
                                element.children[i].innerHTML = original;
                                clearInterval(interval);
                                element.children[i].classList.remove(
                                    "animated-text-running"
                                );
                            }
                        }, 15);
                    }
                } catch (e) {}
            });
        }
    }

    render() {
        return <div className="animated-text" id={this.props.id}></div>;
    }
}
