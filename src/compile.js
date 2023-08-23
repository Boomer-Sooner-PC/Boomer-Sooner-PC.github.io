const fs = require("fs");

let projectsPath = "../projects/";
let projects = fs.readdirSync(projectsPath);

let photoIndex = 0;

let projectsData = {};
for (let project of projects) {
    let path = projectsPath + project + "/";

    let data = {};

    // read the data from data.json inside the folder
    try {
        let fileData = JSON.parse(fs.readFileSync(path + "data.json", "utf8"));
        data = {
            name: project,
            build: fs.existsSync(path + "page.html"),
            about: fs.readFileSync(path + "README.md", "utf8"),
            images: [],
        };

        // add everything from data.json to the data object
        for (let key in fileData) {
            data[key] = fileData[key];
        }
    } catch (e) {
        data = {
            name: project,
            build: fs.existsSync(path + "page.html"),
            about: fs.readFileSync(path + "README.md", "utf8"),
            images: [],
        };
    }
    // images in folder
    let images = fs.readdirSync(path + "images/");

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

const template = fs.readFileSync("src/data/projectTemplate.jsx", "utf8");

for (let dat of Object.keys(projectsData)) {
    let data = projectsData[dat];

    let page = template;

    page = page.replace(
        /<ProjectNameSplit>/g,
        `${data.name.replace(/-/g, "")}`
    );
    page = page.replace(/<ProjectName>/g, `${data.name}`);
    page = page.replace(
        /<Markdown>/g,
        `\`${data.about.replace(/`/g, "\\`")}\``
    );
    page = page.replace(/<Images>/g, `${JSON.stringify(imageArray)}`);

    fs.writeFileSync(`src/pages/projects/${data.name}.jsx`, page);
}

// make the router file
let routerTemplate = fs.readFileSync(
    "src/data/projectsRouterTemplate.jsx",
    "utf8"
);

let importString = "";
let routeString = "";

for (let dat of Object.keys(projectsData)) {
    let data = projectsData[dat];

    importString += `import ${data.name
        .replace(/-/g, "")
        .toUpperCase()} from "../pages/projects/${data.name}";\n`;
    routeString += `<Route path="/${data.name}" element={<${data.name
        .replace(/-/g, "")
        .toUpperCase()} />} />\n`;
}

routerTemplate = routerTemplate.replace(
    /\/\/ start import[\s\S]*\/\/ end import/,
    `// start import\n${importString}// end import`
);
routerTemplate = routerTemplate.replace(
    /<Routes><\/Routes>/,
    `<Routes>\n${routeString}
    <Route path="*" element={<ProjectHome />} />
    </Routes>`
);

fs.writeFileSync("src/pages/ProjectsRouter.jsx", routerTemplate);

// make the projects page
let projectsPage = fs.readFileSync(
    "src/data/projectHomePageTemplate..jsx",
    "utf8"
);

let softwareString = "";
let hardwareString = "";
let competitionString = "";

for (let dat of Object.keys(projectsData)) {
    let data = projectsData[dat];

    let string = `${data.name.replace(/-/g, " ")}`;
    string = string.replace(/\b\w/g, (l) => l.toUpperCase());

    switch (data.category) {
        case "software":
            softwareString += `<div className="project ${data.name}"><a href="/projects/${data.name}"><h3>${string}</h3></a></div>\n`;
            break;
        case "hardware":
            hardwareString += `<div className="project ${data.name}"><a href="/projects/${data.name}"><h3>${string}</h3></a></div>\n`;
            break;
        case "competition":
            competitionString += `<div className="project ${data.name}"><a href="/projects/${data.name}"><h3>${string}</h3></a></div>\n`;
            break;

        default:
            break;
    }
}

projectsPage = projectsPage.replace(
    /<div class="software-projects">*<\/div>/,
    `<div className="software-projects">\n${softwareString}</div>`
);
projectsPage = projectsPage.replace(
    /<div class="hardware-projects">*<\/div>/,
    `<div className="hardware-projects">\n${hardwareString}</div>`
);
projectsPage = projectsPage.replace(
    /<div class="competition-projects">*<\/div>/,
    `<div className="competition-projects">\n${competitionString}</div>`
);

fs.writeFileSync("src/pages/ProjectsHome.jsx", projectsPage);
