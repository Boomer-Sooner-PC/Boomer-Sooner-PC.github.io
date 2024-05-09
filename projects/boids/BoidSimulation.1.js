class BoidSimulation {
    constructor(
        width,
        height,
        numberOfBoids,
        canvas,
        speed,
        minDistance,
        angularSpeedLimit,
        cohesionFactor,
        separationFactor,
        alignmentFactor,
        avoidenceFactor,
        attraction,
        attractionRadius,
        hexcolor
    ) {
        this.width = width;
        this.height = height;
        this.numberOfBoids = numberOfBoids;
        this.canvas = canvas;
        this.speed = speed;
        this.minDistance = minDistance;
        this.angularSpeedLimit = angularSpeedLimit;
        this.cohesionFactor = cohesionFactor;
        this.separationFactor = separationFactor;
        this.alignmentFactor = alignmentFactor;
        this.avoidenceFactor = avoidenceFactor;
        this.lastTime = 0;
        this.attraction = attraction;
        this.attractionRadius = attractionRadius;
        this.hexcolor = hexcolor;
        this.boids = [];
        this.initBoids();
    }

    updateSpeed(speed) {
        this.speed = speed;
        for (let i = 0; i < this.boids.length; i++) {
            this.boids[i].speed = speed;
        }
    }

    initBoids() {
        // make numberOfBoids boids and add them to the boids array all initialized with random x, y, and rotation values
        for (let i = 0; i < this.numberOfBoids; i++) {
            this.boids.push(
                new Boid(
                    Math.random() * this.width,
                    Math.random() * this.height,
                    Math.random() * 360,
                    this.speed,
                    this.width,
                    this.height
                )
            );
        }
    }

    calculateTurnNudge(boid, targetAngle, angularSpeedLimit) {
        // calculate the nudge needed to turn the boid towards the angle, it can only turn with angularSpeedLimit per update
        let nudge = 0;
        let angle = targetAngle - boid.rot;
        if (angle > 180) {
            angle -= 360;
        }

        if (angle < -180) {
            angle += 360;
        }

        if (angle > 0) {
            nudge = angularSpeedLimit;
        } else if (angle < 0) {
            nudge = -angularSpeedLimit;
        }

        return nudge;
    }

    calculateBoidAlignment(boid) {
        // calculate the rotation of the boid based on the average rotation of the boids around it
        let avg = 0;
        let count = 0;
        for (let i = 0; i < this.boids.length; i++) {
            if (this.boids[i] != boid) {
                let dist = Math.sqrt(
                    Math.pow(this.boids[i].x - boid.x, 2) +
                        Math.pow(this.boids[i].y - boid.y, 2)
                );
                if (dist < 100) {
                    avg += this.boids[i].rot;
                    count++;
                }
            }
        }
        if (count > 0) {
            avg /= count;
            return (
                this.alignmentFactor *
                this.calculateTurnNudge(boid, avg, this.angularSpeedLimit)
            );
        }
    }

    calculateBoidCohesion(boid) {
        // calculate the average position of boids nearby and calculate the rotation of the boid based on that
        // apply that rotation with calculateTurnNudge function
        let averageX = 0;
        let averageY = 0;
        let count = 0;

        for (let i = 0; i < this.boids.length; i++) {
            if (this.boids[i] != boid) {
                let dist = Math.sqrt(
                    Math.pow(this.boids[i].x - boid.x, 2) +
                        Math.pow(this.boids[i].y - boid.y, 2)
                );
                if (dist < 100) {
                    averageX += this.boids[i].x;
                    averageY += this.boids[i].y;
                    count++;
                }
            }
        }

        if (count > 0) {
            averageX /= count;
            averageY /= count;
            let angle = Math.atan2(averageY - boid.y, averageX - boid.x);
            let rot = (angle * 180) / Math.PI;

            return (
                this.cohesionFactor *
                this.calculateTurnNudge(boid, rot, this.angularSpeedLimit)
            );
        }
    }

    calculateBoidSeparation(boid) {
        // calculate nearby birds and turn away from them if the minimum separation distance is violated
        let separationForce = { x: 0, y: 0 };

        for (let i = 0; i < this.boids.length; i++) {
            if (this.boids[i] !== boid) {
                let dist = Math.sqrt(
                    Math.pow(this.boids[i].x - boid.x, 2) +
                        Math.pow(this.boids[i].y - boid.y, 2)
                );

                // Check if the distance is less than the minimum separation distance
                if (dist < this.minDistance) {
                    // Calculate the vector pointing away from the neighbor
                    let deltaX = boid.x - this.boids[i].x;
                    let deltaY = boid.y - this.boids[i].y;

                    // Normalize the vector to get a unit vector
                    let length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                    deltaX /= length;
                    deltaY /= length;

                    // Sum the separation force vectors
                    separationForce.x += deltaX;
                    separationForce.y += deltaY;
                }
            }
        }

        // Apply the separation force to the boid
        return (
            this.separationFactor *
            this.calculateTurnNudge(
                boid,
                Math.atan2(separationForce.y, separationForce.x) *
                    (180 / Math.PI),
                this.angularSpeedLimit
            )
        );
    }

    calculateBoidAttraction(boid) {
        //calculate the turn needed to point the boid towards the mouse
        let angle = Math.atan2(
            document.mouseY - boid.y,
            document.mouseX - boid.x
        );

        // calculate distance to mouse
        let dist = Math.sqrt(
            Math.pow(document.mouseX - boid.x, 2) +
                Math.pow(document.mouseY - boid.y, 2)
        );

        // console.log(this.attractionRadius);
        // if the mouse is within the attraction radius, turn towards it
        if (dist < this.attractionRadius) {
            let rot = (angle * 180) / Math.PI;

            return (
                this.attraction *
                this.calculateTurnNudge(boid, rot, this.angularSpeedLimit)
            );
        }
    }

    calculateBoidAvoidence(boid) {
        // avoid the bounds of the canvas
        //up left 0,0 down right width, height
        let rot = 0;
        let dist = 0;

        // if the boid is too far up, turn down
        if (boid.y < 100) {
            rot = 90;
            dist = 100 - boid.y;
        }

        // if the boid is too far down, turn up
        if (boid.y > this.height - 100) {
            rot = 270;
            dist = boid.y - (this.height - 100);
        }

        // if the boid is too far left, turn right
        if (boid.x < 100) {
            rot = 0;
            dist = 100 - boid.x;
        }

        // if the boid is too far right, turn left
        if (boid.x > this.width - 100) {
            rot = 180;
            dist = boid.x - (this.width - 100);
        }

        // if the boid is too close to the edge, turn away
        if (dist > 0) {
            return (
                this.avoidenceFactor *
                this.calculateTurnNudge(boid, rot, this.angularSpeedLimit)
            );
        }
    }

    update() {
        // calculate the time since the last update
        let time = new Date().getTime();
        let deltaTime = time - this.lastTime;

        this.lastTime = time;

        deltaTime /= 20;
        // console.log(deltaTime);
        for (let i = 0; i < this.boids.length; i++) {
            console.log(calculateBoidAlignment(this.boids[i]));
            // nudge += this.calculateBoidCohesion(this.boids[i]);
            // nudge += this.calculateBoidSeparation(this.boids[i]);
            // nudge += this.calculateBoidAttraction(this.boids[i]);
            // nudge += this.calculateBoidAvoidence(this.boids[i]);
            // if (nudge > this.angularSpeedLimit) {
            //     nudge = this.angularSpeedLimit;
            // }
            // if (nudge < -this.angularSpeedLimit) {
            //     nudge = -this.angularSpeedLimit;
            // }
            // this.boids[i].turn(nudge);
        }

        // move all the boids
        for (let i = 0; i < this.boids.length; i++) {
            // console.log(i);
            this.boids[i].move(deltaTime);
        }
    }

    draw() {
        // clear the canvas
        ctx.clearRect(0, 0, this.width, this.height);
        // draw all the boids
        for (let i = 0; i < this.boids.length; i++) {
            this.drawBoid(this.boids[i]);
        }
    }

    drawBoid(boid) {
        // draw a triangle rotated in the direction of the boid
        ctx.save();

        let x = Math.round(boid.x);
        let y = Math.round(boid.y);
        let rot = Math.round(boid.rot);

        ctx.translate(x, y);
        ctx.rotate((rot / 180) * Math.PI);
        ctx.strokeStyle = "#" + this.hexcolor;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, 5);
        ctx.lineTo(0, 10);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.restore();
    }
}
