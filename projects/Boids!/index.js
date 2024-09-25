colors = {
    a: ["493843", "d5b0ac", "cea0ae", "000000", "7067cf"],
};

// update css
let root = document.querySelector(":root");
root.style.setProperty("--background", "#" + colors.a[0]);
root.style.setProperty("--primary", "#" + colors.a[1]);
root.style.setProperty("--secondary", "#" + colors.a[2]);
root.style.setProperty("--text", "#" + colors.a[3]);

// for displaying the controls
function initDropwdown() {
    let flipButton = document.querySelector("#dropdown");
    let controls = document.querySelector("#controls");
    let controlsVisible = false;
    flipButton.onclick = () => {
        if (controlsVisible) {
            controls.style.display = "none";
            controlsVisible = false;
            flipButton.dataset.flip = "false";
        } else {
            controls.style.display = "block";
            controlsVisible = true;
            flipButton.dataset.flip = "true";
        }
    };

    //do the updates for the dislays
    let sliders = document.querySelectorAll(".slider");

    for (let slider of sliders) {
        slider.onmousemove = () => {
            updateParams();

            let display = slider.children[0];
            let input = slider.children[1];
            let value = input.value;
            display.innerHTML = display.innerHTML.split(":")[0] + ": " + value;
        };

        let display = slider.children[0];
        let input = slider.children[1];
        let value = input.value;
        display.innerHTML = display.innerHTML.split(":")[0] + ": " + value;
    }
}

// mouse tracking thanks to https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
document.onmousemove = handleMouseMove;
document.mouseX = 0;
document.mouseY = 0;
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX =
            event.clientX +
            ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
            ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
        event.pageY =
            event.clientY +
            ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
            ((doc && doc.clientTop) || (body && body.clientTop) || 0);
    }

    document.mouseX = event.pageX;
    document.mouseY = event.pageY;
}

function updateParams() {
    if (!document.sim) {
        return;
    }

    let alignemt = parseFloat(document.querySelector("#alignment").value);
    let cohesion = parseFloat(document.querySelector("#cohesion").value);
    let separation = parseFloat(document.querySelector("#separation").value);
    let attraction = parseFloat(document.querySelector("#attraction").value);
    let avoidence = parseFloat(document.querySelector("#avoidence").value);
    let speedLimit = parseFloat(document.querySelector("#speed").value);
    let separationDist = parseFloat(
        document.querySelector("#separationDistance").value
    );
    let attractionRadius = parseFloat(
        document.querySelector("#attractionRadius").value
    );

    document.sim.alignmentFactor = alignemt;
    document.sim.cohesionFactor = cohesion;
    document.sim.separationFactor = separation;
    document.sim.attraction = attraction;
    document.sim.avoidenceFactor = avoidence;
    document.sim.updateSpeed(speedLimit);
    document.sim.minDistance = separationDist;
    document.sim.attractionRadius = attractionRadius;
}

function init() {
    // clear interval if already
    if (document.interval) {
        clearInterval(document.interval);
    }

    simCanvas = document.getElementById("sim");
    // get element width and height
    cwidth = simCanvas.clientWidth;
    cheight = simCanvas.clientHeight;

    // set canvas width and height
    simCanvas.width = cwidth;
    simCanvas.height = cheight;

    // get canvas context
    ctx = simCanvas.getContext("2d");

    let numBoids = parseInt(document.querySelector("#nob").value);
    let alignemt = parseFloat(document.querySelector("#alignment").value);
    let cohesion = parseFloat(document.querySelector("#cohesion").value);
    let separation = parseFloat(document.querySelector("#separation").value);
    let attraction = parseFloat(document.querySelector("#attraction").value);
    let avoidence = parseFloat(document.querySelector("#avoidence").value);
    let speedLimit = parseFloat(document.querySelector("#speed").value);
    let separationDist = parseFloat(
        document.querySelector("#separationDistance").value
    );
    let attractionRadius = parseFloat(
        document.querySelector("#attractionRadius").value
    );

    // create boid simulation
    document.sim = new BoidSimulation(
        cwidth, // width
        cheight, // height
        numBoids, // number of boids
        simCanvas, // canvas
        speedLimit, // speed limit
        separationDist, // separation distance
        5, // angular speed limit
        cohesion, // cohesion factor
        separation, // separation factor
        alignemt, // alignment factor
        avoidence, // avoidence factor
        attraction, // attraction factor
        attractionRadius, // attraction radius
        colors.a[1] // color
    );

    console.log(document.sim);

    // run simulation
    document.interval = setInterval(() => {
        document.sim.update();
        document.sim.draw();
    }, 1000 / 60);
}
