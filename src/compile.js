const fs = require("fs");

let projectsPath = "../projects/";
let projects = fs.readdirSync(projectsPath);

let projectsData = {};
for (let project of projects) {
    let path = projectsPath + project + "/";
    let data = {
        name: project,
        build: fs.existsSync(path + "page.html"),
        about: fs.readFileSync(path + "README.md", "utf8"),
    };
    projectsData[project] = data;
}

// write the data to the json file
fs.writeFileSync(
    "src/data/projects.json",
    JSON.stringify(projectsData, null, 4)
);
