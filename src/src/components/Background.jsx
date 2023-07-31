import React from "react";

import "../css/Background.css";

import starImage from "../images/star.png";

export default class Background extends React.Component {
    componentDidMount() {
        let canvas = document.getElementById("background-canvas");
        let ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // images0
        let starimg = new Image();
        starimg.src = starImage;

        // fill background black
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, width, height);

        let numberOfStars = (width * height) / 2000;
        let stars = [];
        for (let i = 0; i < numberOfStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 15 + 5,
                flicker: Math.random() / 3 + 0.7,
            });
        }

        // track mouse
        let mouse = {
            x: -1000,
            y: -1000,
        };
        document.addEventListener("mousemove", function (event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            draw();
        });

        function drawStars() {
            for (let i = 0; i < numberOfStars; i++) {
                let star = stars[i];

                let size = star.size;

                let distancefromMouse = Math.sqrt(
                    Math.pow(mouse.x - star.x, 2) +
                        Math.pow(mouse.y - star.y, 2)
                );

                let vector = {
                    x: 0,
                    y: 0,
                };

                if (distancefromMouse < 100) {
                    size =
                        star.size + Math.pow(100 - distancefromMouse, 2) / 1000;

                    vector = {
                        x: star.x - mouse.x,
                        y: star.y - mouse.y,
                    };

                    let magnitude = Math.pow(distancefromMouse, 2) / 100;

                    vector.x /= magnitude;
                    vector.y /= magnitude;
                }

                ctx.drawImage(
                    starimg,
                    star.x - size / 2 + vector.x,
                    star.y - size / 2 + vector.y,
                    size,
                    size
                );
                // console.log(size);
            }
        }

        function draw() {
            // fill background black
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, width, height);

            drawStars();

            // requestAnimationFrame(draw);
        }
        draw();
        starimg.onload = () => {
            draw();
        };
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
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: "-1",
                    }}></canvas>
            </div>
        );
    }
}
