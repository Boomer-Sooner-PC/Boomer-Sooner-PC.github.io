import React from "react";

import "../css/BackgroundAnimation.css";

class Point {
    // construct a point with the elements
    constructor(x, y, dir, speed, fadeSpeed, width, height) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.speed = speed;
        this.fadeSpeed = fadeSpeed;
        this.intensity = 0;
        this.hitMax = false;
        this.width = width;
        this.height = height;
    }

    // move the point based on the direction and speed
    update(mouseX, mouseY) {
        this.x += Math.cos(this.dir) * this.speed;
        this.y += Math.sin(this.dir) * this.speed;

        // console.log(this.dir);
        if (this.x > this.width) {
            // this.x = 0;
            this.dir += 3.14;
        }
        if (this.x < 0) {
            // this.x = this.width;
            this.dir += 3.14;
        }
        if (this.y > this.height) {
            // this.y = 0;
            this.dir += 3.14;
        }
        if (this.y < 0) {
            // this.y = this.height;
            this.dir += 3.14;
        }

        if (!this.hitMax) {
            this.intensity += this.fadeSpeed;
            if (this.intensity >= 255) {
                this.hitMax = true;
                this.intensity = 255;
            }
        } else {
            this.intensity -= this.fadeSpeed;
            if (this.intensity <= 0) {
                this.intensity = 0;
            }
        }
    }
}

export default class BackgroundAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.points = [];
        this.lastTime = 0;
        this.requiredTime = 1000 / 60;
        this.mouseX = 0;
        this.mouseY = 0;
        this.myInput = React.createRef();
        this.aspectRatio = window.innerHeight / window.innerWidth;
        this.constructed = false;
        this.killed = false;
    }

    componentDidMount() {
        if (this.constructed) {
            return;
        } else {
            this.constructed = true;
        }

        let canvas = document.getElementById("background");

        if (canvas === null) {
            return;
        }
        // large canvas size to make it able to be shrunk down
        const width = (canvas.width = 3000);
        const height = (canvas.height = 3000 * this.aspectRatio);

        // add the points
        for (let i = 0; i < 60; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            let dir = Math.random() * 2 * Math.PI;
            let speed = Math.random() + 1;
            let fadeSpeed = Math.random() * 0.1 + 0;
            this.points.push(
                new Point(x, y, dir, speed, fadeSpeed, width, height)
            );
        }

        // add the mouse move event listener to constantly track mouse
        onmousemove = (e) => {
            this.mouseX = e.x;
            this.mouseY = e.y;
        };

        // main animation loop
        requestAnimationFrame(this.loop.bind(this));
    }

    componentWillUnmount() {
        // console.log("here");
        // remove the mouse move event listener
        onmousemove = null;

        this.killed = true;

        // clear the canvas
        let canvas = document.getElementById("background");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    loop() {
        if (this.killed) {
            return;
        }

        requestAnimationFrame(this.loop.bind(this));

        // effectivly does the time delta time thing
        let now = Date.now();

        if (this.lastTime === 0) {
            this.lastTime = now;
        }

        let elapsed = now - this.lastTime;

        if (elapsed > this.requiredTime) {
            this.update();
            this.draw();
            this.lastTime = now;
        }
    }

    update() {
        // console.log(this);
        this.points.forEach((point) => {
            point.update(this.mouseX, this.mouseY);
        });
    }

    draw() {
        let canvas = document.getElementById("background");
        let ctx = canvas.getContext("2d");

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.points.forEach((point) => {
            ctx.fillStyle = `rgba(44, 43, 41, ${255})`;
            // ctx.fillRect(point.x, point.y, 5, 5);
        });

        this.points.forEach((point) => {
            this.points.forEach((point2) => {
                let distance = Math.sqrt(
                    Math.pow(point.x - point2.x, 2) +
                        Math.pow(point.y - point2.y, 2)
                );

                if (distance < 400 * Math.max(1, this.aspectRatio)) {
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point2.x, point2.y);
                    let value = this.lineSmoothing(distance);
                    ctx.strokeStyle = `rgba(44, 43, 41, ${value / 255 / 5})`;
                    ctx.stroke();
                }
            });
        });
    }

    lineSmoothing(distance) {
        // distance = distance / 300;
        let value = -(
            (400 * Math.max(1, this.aspectRatio)) / (distance + 1) -
            1
        );
        return value * -255;
    }

    render() {
        return (
            <div className="Background" ref={this.myInput}>
                <canvas
                    id="background"
                    width="3000"
                    height={this.aspectRatio * 3000}></canvas>
            </div>
        );
    }
}
