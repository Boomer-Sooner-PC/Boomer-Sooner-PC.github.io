import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";
import MarkdownIt from "markdown-it";


import dropdownImg from "../../images/dropdown.png";
import githubImg from "../../images/github.png";
import devpostImg from "../../images/devpost.png";

import projectsData from "../../data/projects.json";

import "../../css/Projects.css"

let markdown = `## About

This is some code that turn my cnc router into a tic tac toe robot. It uses a marker where the router bit would usally go to draw the board. Then by using a camera and computer vision it finds where you moved. After that, it decided what the optimal move would be and draws an X there.

## Demonstration

[https://youtu.be/qOsUDwOoCaU](https://youtu.be/qOsUDwOoCaU)
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


export default class tictactoerobot extends React.Component {
    constructor(props) {
        super(props);
        this.projectsGalleryStates = {};
    }

    componentDidMount() {
        const project = projectsData["tic-tac-toe-robot"];

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
        let projectName = "tic-tac-toe-robot";

        projectName = projectName.replace(/-/g, " ");
        projectName = projectName.replace(/\b\w/g, (l) => l.toUpperCase());

        projectTitle.innerText = projectName;
        projectHeader.appendChild(projectTitle);

        if (project.build) {
            const projectLink = document.createElement("a");
            projectLink.href = `/builds/${"tic-tac-toe-robot"}/page.html`;
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
        projectImage.id = `${"tic-tac-toe-robot"}-image`;
        projectImage.className = "project-image";
        projectImage.src = images[imagesNames.indexOf(project.images[0])];
        imageContainer.appendChild(projectImage);

        projectGallery.appendChild(imageContainer);
        projectDescription.appendChild(projectGallery);
        this.projectsGalleryStates["tic-tac-toe-robot"] = {
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
        let projectName = "tic-tac-toe-robot";
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
            <div className="tic-tac-toe-robot">
                <Navbar />
                <Background />
                <div className="project-content"></div>
            </div>
        );
    }
}
