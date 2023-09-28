import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";
import MarkdownIt from "markdown-it";


import dropdownImg from "../../images/dropdown.png";
import githubImg from "../../images/github.png";
import devpostImg from "../../images/devpost.png";

import projectsData from "../../data/projects.json";

import "../../css/Projects.css"

let markdown = `An LED sign that is controlled over WifI
Complete with a status LCD screen and control over a simple website

## Demonstration

[https://youtu.be/xXT149byX28](https://youtu.be/xXT149byX28)

## Materials

-   ESP32
-   32x8
-   5v Power Supply
-   I<sup>2</sup>C LCD Screen
-   10uf capacitor
-   Breadboards

## How to build

1. Open the LED_Board.ino file in the [Arduino IDE](https://www.arduino.cc/en/software)
2. Install the required libraries:
    - ESP32 WiFi
    - Adafruit_GFX
    - Adafruit_NeoMatrix
    - Adafruit_NeoPixel
    - LiquidCrystal_I2C
    - Wire
3. Update the variables in LED_Board.ino

\`\`\`
const char *ssid = "Wifi Name";
const char *password = "Password";
#define DATA_PIN 4
#define LED_PIN 5
#define MATRIX_WIDTH 32
#define MATRIX_HEIGHT 8
#define HOSTNAME "LED-Sign"
#define PORT 80
\`\`\`

I reccomend leaving the port the default because you won't have to type a port at the end ofthe url. The LED pin refers to the pin of a status led and the data pin refers to the pin that connects to the matrix.

<br>

4. Wire up the ESP32
   List of connections: - Connect the EN pin to ground through a 10uf capacitor (not necessary but helps if you're having trouble uploading code) - Connect an LED to ground through a 220 ohm resister on the pin defined in your code - Connect the SDA and SCL pins on your LCD screen to the SDA and SCL pins on the ESP32 - Connect ground and 5v to the LED matrix, LCD and ESP32 (for the ESP32 I had to connect 5v through the usb instead of the pins. I'm unsure if this is the case for all models though.) - Connect data to the LED matrix on the pin define in the previous section - Connect up power to the power supply and connect the power supply to the breadboards

<br>
5. To make the box laser cut out all the svg files in the SVG folder. The file titled "Electronics Box.svg" contains all the parts in one file, while the other files split it up. After laser cutting slide the power carts, assemble all but one side. Put all the electronics in the box and attach the final side. I recommend doing this in a non-permanent way to avoid having the break the box to fix an issue. You can also glue the LED matrix to the backplate if you want it to be more rigid.
   
1. Finally put the lid on and you're done!

## For Changing the HTMl

To update the web page design simply write out everything you want in the HTML file (make sure it is only the 1 file, not using external css or images). Then convert the html into 1 line (I did mine [here](https://www.textfixer.com/html/compress-html-compression.php)) then replace all the " with '. Then replace the HTML line in the LED_Board.ino file.
`;
let imagesNames = ["img0.png","img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png","img8.png","img9.png","img10.png","img11.png","img12.png","img13.png","img14.png","img15.png","img16.png","img17.png","img18.png","img19.png","img20.png","img21.png","img22.png","img23.png","img24.png","img25.png","img26.png","img27.png","img28.png","img29.png","img30.png","img31.png","img32.png","img33.png","img34.png","img35.png","img36.png","img37.png","img38.png"];

function importAll(r) {
    return r.keys().map(r);
}
let imagesTmp = importAll(
    require.context("../../images/projectImages", false, /\.(png|jpe?g|svg)$/)
);

// sort images
imagesTmp.sort((a, b) => {
    try {
        let aIndex = parseInt(a.split("img")[1].split(".")[0]);
        let bIndex = parseInt(b.split("img")[1].split(".")[0]);
        return aIndex - bIndex;
    } catch (e) {
    }

    return 0;
});

// remove duplicates
let seen = {};
const images = imagesTmp.filter((image) => {
    if (seen[image]) {
        return false;
    }
    seen[image] = true;
    return true;
});


export default class WiFiControlledLEDSign extends React.Component {
    constructor(props) {
        super(props);
        this.projectsGalleryStates = {};
    }

    componentDidMount() {
        const project = projectsData["WiFi-Controlled-LED-Sign"];

        const porjectDiv = document.createElement("div");
        porjectDiv.classList.add("project");

        const projectDescription = document.createElement("div");
        projectDescription.classList.add("project-description");

        // make the description
        const projectAbout = document.createElement("div");
        projectAbout.classList.add("project-about");

        projectAbout.innerHTML = MarkdownIt().render(markdown);

        projectDescription.appendChild(projectAbout);

        // make the header with title, link, and icons
        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");

        // header
        const projectTitle = document.createElement("div");
        projectTitle.className = "project-title";
        let projectName = "WiFi-Controlled-LED-Sign";

        projectName = projectName.replace(/-/g, " ");
        projectName = projectName.replace(/\b\w/g, (l) => l.toUpperCase());

        projectTitle.innerText = projectName;
        projectHeader.appendChild(projectTitle);

        if (project.build) {
            const projectLink = document.createElement("a");
            projectLink.href = `/builds/${"WiFi-Controlled-LED-Sign"}/page.html`;
            projectLink.innerText = "View Project";
            projectLink.target = "_blank";
            projectLink.rel = "noopener noreferrer";
            projectLink.className = "project-link";
            projectHeader.appendChild(projectLink);
        }

        if (project.devpost) {
            const devpostImgElm = document.createElement("img");
            devpostImgElm.src = devpostImg;
            devpostImgElm.className = "icon";
            devpostImgElm.classList.add("devpost-icon");
            devpostImgElm.alt = "devpost";

            devpostImgElm.onclick = () => {
                window.open(project.devpost, "_blank");
            };

            projectHeader.appendChild(devpostImgElm);
        }
        if (project.github) {
            const githubImgElm = document.createElement("img");
            githubImgElm.src = githubImg;
            githubImgElm.className = "icon";
            githubImgElm.classList.add("github-icon");
            githubImgElm.alt = "github";

            githubImgElm.onclick = () => {
                window.open(project.github, "_blank");
            };

            projectHeader.appendChild(githubImgElm);
        }

        const projectGallery = document.createElement("div");
        projectGallery.className = "project-gallery";

        const rightArrow = document.createElement("img");
        rightArrow.className = "arrow right";
        rightArrow.src = dropdownImg;

        const leftArrow = document.createElement("img");
        leftArrow.className = "arrow left";
        leftArrow.src = dropdownImg;

        projectGallery.appendChild(leftArrow);
        projectGallery.appendChild(rightArrow);

        // create another div for the image so it can be centered
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        const projectImage = document.createElement("img");
        projectImage.id = `${"WiFi-Controlled-LED-Sign"}-image`;
        projectImage.className = "project-image";
        projectImage.src = images[imagesNames.indexOf(project.images[0])];
        imageContainer.appendChild(projectImage);

        projectGallery.appendChild(imageContainer);
        projectDescription.appendChild(projectGallery);
        this.projectsGalleryStates["WiFi-Controlled-LED-Sign"] = {
            index: 0,
            length: project.images.length,
        };

        leftArrow.onclick = () => {
            this.updateImageGallery(projectName, "left", project.images);
        };
        rightArrow.onclick = () => {
            this.updateImageGallery(projectName, "right", project.images);
        };

        document.querySelector(".project-content").appendChild(projectHeader);
        document
            .querySelector(".project-content")
            .appendChild(projectDescription);
    }

    updateImageGallery(direction, projectImages) {
        let projectName = "WiFi-Controlled-LED-Sign";
        const state = this.projectsGalleryStates[projectName];

        if (direction === "left") {
            state.index--;
            if (state.index < 0) {
                state.index = state.length - 1;
            }
        } else {
            state.index++;
            if (state.index >= state.length) {
                state.index = 0;
            }
        }

        const projectImage = document.querySelector(`#${projectName}-image`);
        projectImages = projectsData[projectName].images;
        projectImage.src =
            images[imagesNames.indexOf(projectImages[state.index])];
    }

    render() {
        return (
            <div className="WiFi-Controlled-LED-Sign">
                <Navbar />
                <Background />
                <div className="project-content"></div>
            </div>
        );
    }
}
