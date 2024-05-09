class Boid {
    /*
     * @param {number} x - x position of boid
     * @param {number} y - y position of boid
     * @param {number} rot - rotation of boid in degrees
     * @param {number} speed - speed of boid
     * @param {number} boundx - x bound of boid
     * @param {number} boundy - y bound of boid
     *
     * This class represents an individual in the boid simulation. It just tracks the position, rotation, and speed of the boid.
     * It also has a move function that updates the position of the boid based on its speed and rotation.
     * Drawing the boid is not handled by this class.
     */

    constructor(x, y, rot, speed, boundx, boundy) {
        // these will change
        this.x = x;
        this.y = y;
        this.rot = rot;

        this.speed = speed;
        this.boundx = boundx;
        this.boundy = boundy;
    }

    move(deltaTime) {
        if (deltaTime > 100) {
            deltaTime = 100;
        }
        if (deltaTime < 0) {
            deltaTime = 0;
        }

        this.x += deltaTime * this.speed * Math.cos((this.rot / 180) * Math.PI);
        this.y += deltaTime * this.speed * Math.sin((this.rot / 180) * Math.PI);

        // bounds detection have the boid wrap around the screen
        if (this.x > this.boundx) {
            this.x = this.x - this.boundx;
        }

        if (this.x < 0) {
            this.x = this.boundx + this.x;
        }

        if (this.y > this.boundy) {
            this.y = this.y - this.boundy;
        }

        if (this.y < 0) {
            this.y = this.boundy + this.y;
        }
    }

    nudge(x, y) {
        this.x += x;
        this.y += y;
    }

    // methods to change the boids rotation
    turn(rot) {
        this.rot += rot;
    }

    setRot(rot) {
        this.rot = rot;
    }
}
