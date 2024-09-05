import React from "react";
import $ from "jquery";
import "../css/Background.css";

export default class Background3 extends React.Component {
    componentDidMount() {
        let canvas = document.getElementById("background-canvas");
        let ctx = canvas.getContext("2d");
        let width = (canvas.width = $(document).width());
        let height = (canvas.height = $(document).height());

        // detect document resize jquery

        $(window).resize(function () {
            update_canvas();
        });

        // on scroll
        $(window).scroll(function () {
            let newHeight = $(document).height();
            if (newHeight != height) {
                update_canvas();
            }
        });

        function createRandomGradient(ctx, colors, points) {
            const gradient = ctx.createLinearGradient(
                points[0].x,
                points[0].y,
                points[1].x,
                points[1].y
            );

            for (let i = 0; i < colors.length; i++) {
                gradient.addColorStop(i / (colors.length - 1), colors[i]);
            }

            // console.log("here");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        let stars = {};

        function addStars(N) {
            for (let i = 0; i < N; i++) {
                stars[i] = {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    f: Math.random(),
                    v: Math.random(),
                };
            }
        }

        function drawStars() {
            // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            Object.values(stars).forEach((star) => {
                star.v += star.f / 50 + Math.random() / 100;
                if (star.v >= 1) {
                    star.v = 1;
                    star.f = -star.f;
                }
                if (star.v <= 0.3) {
                    star.v = 0.3;
                    star.f = -star.f;
                }

                let color = Math.floor(star.v * 255);
                ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;

                ctx.fillRect(star.x, star.y, 1, 1);
            });
            requestAnimationFrame(drawStars); // Request the next frame
        }

        function update_canvas() {
            // get body width and height
            width = canvas.width = $(document).width();
            height = canvas.height = $(document).height();
            document.getElementById("background-canvas").style.height =
                height + "px"; // only for height because scrolling

            const colors = ["#1a1a20", "#161322", "#110f19", "#1a1820"];
            const points = [
                [0, 0],
                [width / 1.5, height / 1.5],
                [width / 3, height / 4],
                [width / 4, height / 5],
            ];
            const gradientPoints = [
                { x: 0, y: 0 },
                { x: canvas.width, y: canvas.height },
            ];

            // createRandomGradient(ctx, colors, gradientPoints);

            addStars((width * height) / 1500);
        }

        update_canvas();
        drawStars();
    }

    render() {
        return (
            <div id="background">
                <canvas
                    id="background-canvas"
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        position: "fixed",
                        top: "0",
                        left: "0",
                        zIndex: "-1",
                    }}></canvas>
                <div id="background-gradient"></div>
            </div>
        );
    }
}
