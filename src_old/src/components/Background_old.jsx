import React from "react";
import $ from "jquery";
import "../css/Background.css";

import starImage from "../images/star.png";

export default class BackgroundOld extends React.Component {
    componentDidMount() {
        let canvas = document.getElementById("background-canvas");
        let ctx = canvas.getContext("2d");
        let width = (canvas.width = $(document).width());
        let height = (canvas.height = $(document).height());

        console.log(width, height);

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

        function update_canvas() {
            // get body width and height
            width = canvas.width = $(document).width();
            height = canvas.height = $(document).height();
            document.getElementById("background-canvas").style.height =
                height + "px"; // only for height because scrolling

            console.log(width, height);
            numberOfStars = (width * height) / 2000;
            stars = [];
            for (let i = 0; i < numberOfStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 15 + 5,
                    flicker: Math.random() / 3 + 0.7,
                });
            }
            draw();
        }

        function drawStars() {
            for (let i = 0; i < numberOfStars; i++) {
                let star = stars[i];

                let size = star.size;

                let mousex = mouse.x + $(window).scrollLeft();
                let mousey = mouse.y + $(window).scrollTop();

                let distancefromMouse = Math.sqrt(
                    Math.pow(mousex - star.x, 2) + Math.pow(mousey - star.y, 2)
                );

                let vector = {
                    x: 0,
                    y: 0,
                };

                if (distancefromMouse < 100) {
                    size =
                        star.size + Math.pow(100 - distancefromMouse, 2) / 1000;

                    let height_scrolled_px = $(window).scrollTop();

                    vector = {
                        x: star.x - mousex,
                        y: star.y - mousey,
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
