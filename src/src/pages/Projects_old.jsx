import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";
import MarkdownIt from "markdown-it";

import projectsData from "data/projects.json";
import "../css/Projects.css";

import dropdownImg from "../images/dropdown.png";
import githubImg from "../images/github.png";
import devpostImg from "../images/devpost.png";

let imageFileNames = [
    "img0.png",
    "img1.png",
    "img2.png",
    "img3.png",
    "img4.png",
    "img5.png",
    "img6.png",
    "img7.png",
    "img8.png",
    "img9.png",
    "img10.png",
    "img11.png",
    "img12.png",
    "img13.png",
    "img14.png",
    "img15.png",
    "img16.png",
    "img17.png",
    "img18.png",
    "img19.png",
    "img20.png",
    "img21.png",
    "img22.png",
    "img23.png",
    "img24.png",
    "img25.png",
    "img26.png",
    "img27.png",
    "img28.png",
    "img29.png",
]; // filenames

function importAll(r) {
    return r.keys().map(r);
}
let imagesTmp = importAll(
    require.context("../images/projectImages", false, /\.(png|jpe?g|svg)$/)
);

console.log(imagesTmp);

// sort images
imagesTmp.sort((a, b) => {
    try {
        let aIndex = parseInt(a.split("img")[1].split(".")[0]);
        let bIndex = parseInt(b.split("img")[1].split(".")[0]);
        return aIndex - bIndex;
    } catch (e) {
        console.log(a);
        console.log(b);
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

export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.projectsGalleryStates = {};
    }

    componentDidMount() {
        const md = new MarkdownIt();

        const softwareProjects = document.querySelector(".software-projects");
        const hardwareProjects = document.querySelector(".hardware-projects");
        const competitionProjects = document.querySelector(
            ".competition-projects"
        );

        for (let projectName of Object.keys(projectsData)) {
            const project = projectsData[projectName];

            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.classList.add(projectName);

            const projectHeader = document.createElement("div");
            projectHeader.className = "project-header";

            const line = document.createElement("div");
            line.className = "line";
            // projectHeader.appendChild(line);

            const projectHeaderContainer = document.createElement("div");
            projectHeaderContainer.className = "project-header-container";

            const projectTitle = document.createElement("div");
            projectTitle.className = "project-title";

            let title = project.name;
            title = title.replace(/-/g, " ");
            title = title.replace(/\b\w/g, (l) => l.toUpperCase());

            projectTitle.innerHTML = title;
            projectHeaderContainer.appendChild(projectTitle);

            if (project.build) {
                let link =
                    window.location.origin +
                    "/projects/" +
                    projectName +
                    "/page.html";
                const projectLink = document.createElement("a");
                projectLink.href = link;
                projectLink.innerText = "View Project";
                projectHeaderContainer.appendChild(projectLink);
            }

            if (project.github) {
                const githubImgElm = document.createElement("img");
                githubImgElm.className = "github-img";
                githubImgElm.src = githubImg;
                projectHeaderContainer.appendChild(githubImgElm);

                githubImgElm.onclick = () => {
                    window.open(project.github, "_blank");
                };
            }

            if (project.devpost) {
                const devpostImgElm = document.createElement("img");
                devpostImgElm.className = "devpost-img";
                devpostImgElm.src = devpostImg;
                projectHeaderContainer.appendChild(devpostImgElm);

                devpostImgElm.onclick = () => {
                    window.open(project.devpost, "_blank");
                };
            }

            projectHeader.appendChild(projectHeaderContainer);

            const projectDropdown = document.createElement("img");
            projectDropdown.className = "project-dropdown";
            projectDropdown.src = dropdownImg;

            projectHeader.appendChild(projectDropdown);

            projectDiv.appendChild(projectHeader);

            const projectDescription = document.createElement("div");
            projectDescription.className = "project-desc";
            projectDescription.style.display = "none";
            projectDescription.innerHTML = md.render(project.about);
            projectDiv.appendChild(projectDescription);

            projectDropdown.onclick = () => {
                let state = projectDescription.style.display;
                if (state === "none") {
                    projectDescription.style.display = "block";
                }
                if (state === "block") {
                    projectDescription.style.display = "none";
                }

                // flip the arrow
                projectDropdown.style.transform =
                    state === "none" ? "rotate(180deg)" : "rotate(0deg)";
            };

            // add image gallery
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
            projectImage.id = `${projectName}-image`;
            projectImage.className = "project-image";
            projectImage.src =
                images[imageFileNames.indexOf(project.images[0])];
            imageContainer.appendChild(projectImage);

            projectGallery.appendChild(imageContainer);
            projectDescription.appendChild(projectGallery);
            this.projectsGalleryStates[projectName] = {
                index: 0,
                length: project.images.length,
            };

            leftArrow.onclick = () => {
                this.updateImageGallery(projectName, "left", project.images);
            };
            rightArrow.onclick = () => {
                this.updateImageGallery(projectName, "right", project.images);
            };

            if (project.category === "software") {
                softwareProjects.appendChild(projectDiv);
            }
            if (project.category === "hardware") {
                hardwareProjects.appendChild(projectDiv);
            }
            if (project.category === "competition") {
                competitionProjects.appendChild(projectDiv);
            }
        }
    }

    updateImageGallery(projectName, direction, projectImages) {
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
            images[imageFileNames.indexOf(projectImages[state.index])];
    }

    render() {
        return (
            <div className="Projects">
                <Navbar />
                <Background />
                <h1>Projects</h1>
                <div className="projects">
                    <h2 className="cat-title software-title">Software</h2>
                    <div className="software-projects"></div>
                    <h2 className="cat-title">Hardware</h2>
                    <div className="hardware-projects"></div>
                    <h2 className="cat-title">Competition</h2>
                    <div className="competition-projects"></div>
                </div>
            </div>
        );
    }
}
