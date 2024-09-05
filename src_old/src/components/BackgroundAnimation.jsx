import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";

import "../css/BackgroundAnimation.css";

class BackgroundAnimation extends React.Component {
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

    update(mouseX, mouseY) {
        this.x += Math.cos(this.dir) * this.speed;
        this.y += Math.sin(this.dir) * this.speed;

        // get angle between point and mouse
        let thetaAB =
            Math.atan2(mouseY - this.y, mouseX - this.x) * (180 / Math.PI);
        thetaAB = (thetaAB + 360) % 360;
        let theta =
            (thetaAB * (Math.PI / 180) - this.dir + 2 * Math.PI) %
            (2 * Math.PI);

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

export default class Testing extends React.Component {
    constructor(props) {
        super(props);
        this.points = [];
        this.lastTime = 0;
        this.requiredTime = 1000 / 60;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    componentDidMount() {
        let canvas = document.getElementById("background");

        const aspectRatio = window.innerHeight / window.innerWidth;

        const width = (canvas.width = 1920);
        const height = (canvas.height = 1920 * aspectRatio);

        for (let i = 0; i < 50; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            let dir = Math.random() * 2 * Math.PI;
            let speed = Math.random() + 1;
            let fadeSpeed = Math.random() * 0.1 + 0;
            this.points.push(
                new Point(x, y, dir, speed, fadeSpeed, width, height)
            );
        }

        onmousemove = (e) => {
            this.mouseX = e.x;
            this.mouseY = e.y;
        };

        requestAnimationFrame(this.loop.bind(this));
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));

        let now = Date.now();

        if (this.lastTime == 0) {
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

            // let distanceFromMouse = Math.sqrt(
            //     Math.pow(point.x - this.mouseX, 2),
            //     Math.pow(point.y - this.mouseY, 2)
            // );

            // // console.log(this.mouseX);

            // let force = -Math.pow(500 * distanceFromMouse, 1 / 3) + 40;
            // if (force < 0) force = 0;
            // force = force * point.speed;
            // force /= 10;

            // console.log(force);

            // point.x += Math.sign(point.x - this.mouseX) * force;
            // point.y += Math.sign(point.y - this.mouseY) * force;
            // console.log(point.x, point.y);
        });
    }

    draw() {
        let canvas = document.getElementById("background");
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "#eef1f2";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

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

                if (distance < 350) {
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point2.x, point2.y);
                    let value = this.lineSmoothing(distance);
                    // console.log(value);
                    ctx.strokeStyle = `rgba(44, 43, 41, ${value / 255})`;
                    ctx.stroke();
                }
            });
        });
    }

    lineSmoothing(distance) {
        // distance = distance / 300;
        let value = -(350 / (distance + 1) - 1);
        return value * -255;
    }

    render() {
        return (
            <div className="Background">
                <canvas id="background"></canvas>
            </div>
        );
    }
}
