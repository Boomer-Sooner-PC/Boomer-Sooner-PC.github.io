import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";
import MarkdownIt from "markdown-it";

import projectsData from "data/projects.json";
import "../css/Projects.css";

import dropdownImg from "../images/dropdown.png";
import githubImg from "../images/github.png";

let imageFileNames = ["img0.png","img1.png","img2.png","img3.png"];

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(
    require.context("../images/projectImages", false, /\.(png|jpe?g|svg)$/)
);

export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.projectsGalleryStates = {};
    }

    componentDidMount() {
        const md = new MarkdownIt();

        for (let projectName of Object.keys(projectsData)) {
            const project = projectsData[projectName];

            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.classList.add(projectName);

            const projectHeader = document.createElement("div");
            projectHeader.className = "project-header";

            const projectTitle = document.createElement("div");
            projectTitle.className = "project-title";

            let title = project.name;
            title = title.replace(/-/g, " ").toLowerCase();
            title = title.replace(/\b\w/g, (l) => l.toUpperCase());

            projectTitle.innerHTML = title;
            projectHeader.appendChild(projectTitle);

            if (project.build) {
                let link =
                    window.location.origin +
                    "/projects/" +
                    projectName +
                    "/page.html";
                const projectLink = document.createElement("a");
                projectLink.href = link;
                projectLink.innerText = "View Project";
                projectHeader.appendChild(projectLink);
            }

            if (project.github) {
                const githubImgElm = document.createElement("img");
                githubImgElm.className = "github-img";
                githubImgElm.src = githubImg;
                projectHeader.appendChild(githubImgElm);

                githubImgElm.onclick = () => {
                    window.open(project.github, "_blank");
                };
            }

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

            document.querySelector(".projects").appendChild(projectDiv);
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
        projectImage.src =
            images[imageFileNames.indexOf(projectImages[state.index])];
    }

    render() {
        return (
            <div className="Projects">
                <Navbar />
                <Background />
                <h1>Projects</h1>
                <div className="projects"></div>
            </div>
        );
    }
}
