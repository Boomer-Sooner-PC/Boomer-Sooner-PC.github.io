import React from "react";

import "../css/Casino.css";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.mouseX = 0;
        this.mouseY = 0;

        this.x = 0;
        this.y = 0;
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.handleMouseMove.bind(this));

        const casino = document.getElementById("Casino");
        const rect = casino.getBoundingClientRect();
        this.x = rect.left + rect.width / 2;
        this.y = rect.top + rect.height / 2;

        this.drawSlotMachine(0);
    }

    componentWillUnmount() {
        document.removeEventListener(
            "mousemove",
            this.handleMouseMove.bind(this)
        );
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        const mp = document.getElementById("mp");

        // mp.innerHTML = Math.sqrt(
        //     Math.pow(this.mouseX - this.x, 2) +
        //         Math.pow(this.mouseY - this.y, 2)
        // );
    }

    drawRectangleAsLines(ctx, x, y, y2, x2, lineWidth, curveRadius) {
        ctx.beginPath();

        ctx.moveTo(x + curveRadius, y);
        ctx.lineTo(x2 - curveRadius, y);
        ctx.quadraticCurveTo(x2, y, x2, y + curveRadius);
        ctx.lineTo(x2, y2 - curveRadius);
        ctx.quadraticCurveTo(x2, y2, x2 - curveRadius, y2);
        ctx.lineTo(x + curveRadius, y2);
        ctx.quadraticCurveTo(x, y2, x, y2 - curveRadius);
        ctx.lineTo(x, y + curveRadius);
        ctx.quadraticCurveTo(x, y, x + curveRadius, y);

        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    drawSlotMachine(state) {
        let canvas = document.getElementById("slot-machine-canvas");
        let ctx = canvas.getContext("2d");

        let width = (canvas.width = canvas.getBoundingClientRect().width * 3);
        let height = (canvas.height =
            canvas.getBoundingClientRect().height * 3);

        let scale = width / 100;

        let lineWidth = scale / 3;

        // rectangles in [x, y, x2, y2, curveRad] format
        let offset = 2;
        let rad = 4;
        let rectangles = [
            [0, 0, 70, 15, rad], // top box
            [0 + offset, 0 + offset, 70 - offset, 15 - offset, rad], // top box inner
            [0, 15 + offset, 70, 45, rad], // bottom box
            [0 + offset, 15 + offset * 2, 70 - offset, 45 - offset, rad], // bottom box inner
            [
                70 + offset,
                15 + offset * 2 + 5,
                70 + offset + 5,
                45 - offset - 5,
                rad - 2,
            ], // axle
            [
                70 + offset + 5 + offset,
                5,
                70 + offset + 5 + offset + 4,
                45 - offset - 10,
                rad - 2,
            ],
        ];

        if (state === 0) {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = "rgb(0, 0, 0)";

            rectangles.forEach((rectangle) => {
                this.drawRectangleAsLines(
                    ctx,
                    rectangle[0] * scale,
                    rectangle[1] * scale,
                    rectangle[3] * scale,
                    rectangle[2] * scale,
                    lineWidth,
                    rectangle[4] * scale
                );
            });
        }
    }

    render() {
        return (
            <div id="Casino">
                <div id="mp">
                    <canvas id="slot-machine-canvas"></canvas>
                </div>
            </div>
        );
    }
}
