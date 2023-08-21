import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";

import projectsData from "data/projects.json";
import "../css/Projects.css";

import dropdownImg from "../images/dropdown.png";

import MarkdownIt from "markdown-it";

export default class Projects extends React.Component {
    componentDidMount() {
        const md = new MarkdownIt();

        for (let projectName of Object.keys(projectsData)) {
            const project = projectsData[projectName];

            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");

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

            document.querySelector(".projects").appendChild(projectDiv);
        }
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
