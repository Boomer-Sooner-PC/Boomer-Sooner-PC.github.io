const fs = require("fs");
const showdown = require("showdown");

const PROJECT_HOME_PATH = "./src/pages/ProjectsHome.jsx";
const IMAGE_DIR = "./src/images/projectImages/";

let projectsPath = "../projects/";
let projects = fs.readdirSync(projectsPath);

// make the project list for the project home folder
// gets the name, description, category, and if it's featured
let projectList = [];
let imagesList = [];
let imageIndex = 0;

// empty images directory
fs.readdirSync(IMAGE_DIR).forEach((file) => {
    fs.unlinkSync(IMAGE_DIR + file);
});

projects.forEach((project) => {
    let json = JSON.parse(
        fs.readFileSync(projectsPath + project + "/data.json")
    );

    let obj = {
        title: project.replace(/-/g, " "),
        description: json.description,
        category: json.category,
        github: json.github,
        devpost: json.devpost,
    };
    if (json.featured) {
        obj.featured = true;
    } else {
        obj.featured = false;
    }

    obj.images = [];

    let files = fs.readdirSync(projectsPath + project);
    let images = fs.readdirSync(projectsPath + project + "/images");

    images.forEach((image) => {
        let newName = `projImg${imageIndex++}.${image.split(".")[1]}`;
        imagesList.push(newName);
        fs.copyFileSync(
            projectsPath + project + "/images/" + image,
            IMAGE_DIR + newName
        );

        obj.images.push(newName);
    });

    // if there is a page.html then it is a project with a deployment.
    if (files.includes("page.html")) {
        obj.deployed = `https://michaelmanders.com/builds/${project}/page.html`;
    } else {
        obj.deployed = false;
    }

    projectList.push(obj);

    // now do the markdown thing
    let converter = new showdown.Converter();
    let html = converter.makeHtml(
        fs.readFileSync(projectsPath + project + "/README.md", "utf8")
    );

    obj.info = html;
});

// write that list to the project home file
let file = fs.readFileSync(PROJECT_HOME_PATH, "utf8");

let startIndex =
    file.indexOf("//<project-list-start>//") +
    "//<project-list-start>//".length;
let endIndex = file.indexOf("//<project-list-end>//");

let start = file.slice(0, startIndex);
let end = file.slice(endIndex);

let middle = `this.projects = ${JSON.stringify(projectList, null, 4)};`;

file = start + "\n" + middle + "\n" + end;
fs.writeFileSync(PROJECT_HOME_PATH, file);
