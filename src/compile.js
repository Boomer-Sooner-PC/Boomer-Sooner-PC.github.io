const fs = require("fs");

let projectsPath = "../projects/";
let projects = fs.readdirSync(projectsPath);

let photoIndex = 0;

let projectsData = {};
for (let project of projects) {
    let path = projectsPath + project + "/";

    // read the data from data.json inside the folder
    let fileData = JSON.parse(fs.readFileSync(path + "data.json", "utf8"));
    // images in folder
    let images = fs.readdirSync(path + "images/");
    let data = {
        name: project,
        build: fs.existsSync(path + "page.html"),
        about: fs.readFileSync(path + "README.md", "utf8"),
        github: fileData.github,
        images: [],
    };

    for (let image of images) {
        data.images.push(`img${photoIndex}.png`);
        fs.copyFileSync(
            path + "images/" + image,
            `src/images/projectImages/img${photoIndex}.png`
        );
        photoIndex++;
    }

    projectsData[project] = data;
}

// write the data to the json file
fs.writeFileSync(
    "src/data/projects.json",
    JSON.stringify(projectsData, null, 4)
);

let imageArray = [];
for (let i = 0; i < photoIndex; i++) {
    imageArray.push(`img${i}.png`);
}

let projectJsx = fs.readFileSync("src/pages/Projects.jsx", "utf8");
// replace everything from let imageFileNames = [*]; with the imageArray
projectJsx = projectJsx.replace(
    /let imageFileNames = \[.*\];/g,
    `let imageFileNames = ${JSON.stringify(imageArray)};`
);

fs.writeFileSync("src/pages/Projects.jsx", projectJsx);
