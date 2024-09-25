import React from "react";
import PageWrapper from "components/PageWrapper";

import "../css/ProjectsHome.css";

import devpostImg from "../images/devpost.png";
import githubImg from "../images/github.png";

import { IoCaretBackCircleOutline } from "react-icons/io5";
export default class ProjectHome extends React.Component {
    constructor(props) {
        super(props);

        //<project-list-start>//
this.projects = [
    {
        "title": "Bingo Paradox Sim",
        "description": "JavaScript simulation of the Bingo Paradox",
        "category": "software",
        "featured": false,
        "images": [
            "projImg0.png"
        ],
        "deployed": "https://michaelmanders.com/builds/Bingo-Paradox-Sim/page.html",
        "info": "<h2 id=\"about\">About</h2>\n<p>This is a simulation of bingo games. Inspired by Matt Parkers video. <a href=\"https://www.youtube.com/watch?v=AHP1T8fTxpQ\">View here</a></p>"
    },
    {
        "title": "Blackjack Trainer",
        "description": "Trainer for the proper move in a game of Blackjack",
        "category": "software",
        "github": "https://github.com/michael-manders/blackjack-trainer",
        "featured": false,
        "images": [
            "projImg1.png",
            "projImg2.png",
            "projImg3.png"
        ],
        "deployed": "https://michaelmanders.com/builds/Blackjack-Trainer/page.html",
        "info": "<h2 id=\"about\">About</h2>\n<p>This is a tool for helping learn the optimal blackjack strategy. It presents you with your hand of 2 cards and the dealer hand of 1 visible and 1 hidden card. You must choose which is the optimal move to make out of hitting, standing, doubling down, or splitting. If you get it correct it updates the stats, and if you get it incorrect it tells you the correct answer and updates the stats.</p>"
    },
    {
        "title": "Boids!",
        "description": "Boids simulation in JavaScript and HTML",
        "category": "software",
        "featured": false,
        "images": [
            "projImg4.png"
        ],
        "deployed": "https://michaelmanders.com/builds/Boids!/page.html",
        "info": "<h2 id=\"about\">About</h2>\n<p>Quick and simple boids simulation following the 3 rules to describe boid behavior.</p>"
    },
    {
        "title": "Carbon Consulting  HackDFW2022",
        "description": "Lame project for HackDFW 2022",
        "category": "competition",
        "github": "https://github.com/michael-manders/Hackathons/tree/main/HackDFW",
        "devpost": "https://devpost.com/software/common-carbon",
        "featured": false,
        "images": [
            "projImg5.png",
            "projImg6.png"
        ],
        "deployed": false,
        "info": "<h2 id=\"about\">About</h2>\n<p>This is the project my team and I made for HackDFW2022. This was the first Hackathon I have ever competed at.\nSee <a href=\"https://devpost.com/software/common-carbon\">devpost</a> for more details</p>\n<h2 id=\"awards\">Awards</h2>\n<p>none :(</p>"
    },
    {
        "title": "Correlations in AllRecipes",
        "description": "Statistical analysis of ingredient correlations in AllRecipes database",
        "category": "software",
        "github": "https://github.com/michael-manders/correlation-in-allrecipes-database",
        "featured": false,
        "images": [
            "projImg7.png",
            "projImg8.png"
        ],
        "deployed": "https://michaelmanders.com/builds/Correlations-in-AllRecipes/page.html",
        "info": "<h2 id=\"explanation\">Explanation</h2>\n<p>This is a tool to visualize the correlations between ingredients in the AllRecipes database. I was inspired to make this by <a href=\"https://www.reddit.com/r/dataisbeautiful/comments/wuzidf/oc_correlation_between_spices_shared_in_recipes/\">this</a> Reddit post. It generates a correlation matrix between the selected ingredients and then displays it as a heatmap. The color of each cell represents the correlation factor between the two ingredients.</p>\n<h2 id=\"howitwasmade\">How it was made</h2>\n<p>I first took the dataset from this <a href=\"https://archive.org/details/allrecipes.com_recipes_12042020000000\">internet archive</a> that contains about 71,000 recipes scraped from AllRecipes. And wrote a python script that parsed the dataset and loaded it into a json file that contains only the relevant information (recipe name, ingredients, category, rating).\nThen I downloaded <a href=\"https://github.com/schollz/food-identicon/blob/master/ingredients.txt\">a text file</a> containing a list of bunch of ingredients. However that list contained a lot of junk items (like ingredients that contained measurements), so I make another python script that removed those items.\nThe recipes dataset's ingredients were written like \"1 cup of flour\", so I needed to just isolate the ingredient's name. I found a <a href=\"https://pypi.org/project/ingredient-parser-nlp/\">python library</a> that could do that, but it wasn't perfect. So after running the ingredients through that, the python script looks through the list of ingredients, and the largest item from that list that is a substring of the ingredient, becomes the ingredient. After running this I had a list of recipes, and their ingredients.\nTo calculate the correlation matrix, I wrote a javascript function (so it could be hosted on a static website) that takes in a list of ingredients, and a category (if you want to only look at a certain category of recipes), and then calculates the correlation matrix.\nThen I wrote a javascript function that takes in the correlation matrix, and generates an image that represents it.\nFinally I wrote this webpage to display the image, and allow the user to select the ingredients they want to analyze.</p>\n<h2 id=\"limitations\">Limitations</h2>\n<p>The dataset is not perfect, and there are some issues I could see with it. The primary issue is that the data is fairly western focused, so the correlations will reflect that.</p>"
    },
    {
        "title": "Educators Exchange  RISDxACM Hackathon",
        "description": "Share supplies with other teachers, project for RISDxACM Hackathon",
        "category": "competition",
        "github": "https://github.com/michael-manders/Hackathons/tree/main/RISDxACM%20Hackathon",
        "featured": false,
        "images": [
            "projImg9.png",
            "projImg10.png",
            "projImg11.png",
            "projImg12.png"
        ],
        "deployed": false,
        "info": "<h2 id=\"about\">About</h2>\n<p>This the project my team and I made for the RISDxACM Hackathon. To see more about what this project is and does see the <a href=\"https://www.canva.com/design/DAFgMEpXxCk/Kbt3wO8tUcUscoqTaEG0yg/edit?utm_content=DAFgMEpXxCk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton\">presentation </a>we made.</p>\n<h2 id=\"awards\">Awards</h2>\n<p>1st place advanced division</p>"
    },
    {
        "title": "Moon Phase Chart",
        "description": "Best moon phase chart out there!",
        "category": "software",
        "github": "https://github.com/michael-manders/moon-phase-chart",
        "featured": false,
        "images": [
            "projImg13.png",
            "projImg14.png"
        ],
        "deployed": "https://michaelmanders.com/builds/Moon-Phase-Chart/page.html",
        "info": "<h2 id=\"about\">About</h2>\n<p>This is a moon phase chart I built to help me plan out astro-imaging nights. It provides the moon phase, moon rise and set time, and the astro dark start and end time. This is useful so you can see how much of the night is moon-free.</p>\n<p>It will get your location, or you can enter manually, and you select the dates, and it will calculate for that month.</p>\n<h2 id=\"credits\">Credits</h2>\n<p>I pretty much just copied the code from <a href=\"http://hinch.me.uk/riset.html#twig03a\">this site</a> to perform the calculations for the site.</p>"
    },
    {
        "title": "Oak Operations  HackSMU2023",
        "description": "Winning project for HackSMU 2023",
        "category": "competition",
        "github": "https://github.com/michael-manders/Hackathons/tree/main/HackSMU",
        "devpost": "https://devpost.com/software/oak-operations?ref_content=my-projects-tab&ref_feature=my_projects",
        "featured": false,
        "images": [
            "projImg15.png",
            "projImg16.png",
            "projImg17.png",
            "projImg18.png"
        ],
        "deployed": false,
        "info": "<h2 id=\"about\">About</h2>\n<p>This is my team's project made for HackSMU and specifically the CBRE Challenge. Check out the <a href=\"https://youtu.be/M10nQZ4L8gM?si=Fvrnjsj2Xstf7NAx\">YouTube</a>, Devpost and GitHub for more details.</p>\n<h2 id=\"awards\">Awards</h2>\n<p>2nd place CBRE challenge</p>\n<p>Best use of Google Cloud</p>"
    },
    {
        "title": "One Pizza Team Calculator",
        "description": "Do not look at this.",
        "category": "software",
        "github": "https://github.com/michael-manders/One-Pizza-Team-Calculator",
        "featured": false,
        "images": [
            "projImg19.png",
            "projImg20.png"
        ],
        "deployed": "https://michaelmanders.com/builds/One-Pizza-Team-Calculator/page.html",
        "info": "<h2 id=\"about\">About</h2>\n<p>This is a tool that calculates the size of a single pizza needed to feed a team thereby making it a one pizza team. It uses three.js to visualize the pizza and the scales. It is intentially designed to look bad.</p>"
    },
    {
        "title": "Ranked Choice Voting Website",
        "description": "Live polling website using ranked choice voting",
        "category": "software",
        "github": "https://github.com/michael-manders/RCV-Polling-Website",
        "featured": false,
        "images": [
            "projImg21.png",
            "projImg22.png",
            "projImg23.png",
            "projImg24.png"
        ],
        "deployed": false,
        "info": "<h2 id=\"about\">About</h2>\n<p>This is a website similar to Menti.com but instead of first past the post it uses ranked choice voting to calculate the winner.</p>\n<h2 id=\"start\">Start</h2>\n<p>To run this locally simply install Node.js on your computer, open the directory in a terminal and type <code>node .</code></p>"
    },
    {
        "title": "School Points System",
        "description": "Built a few years ago, simple system for tracking school points",
        "category": "software",
        "github": "https://github.com/michael-manders/school-money-system/tree/main",
        "featured": false,
        "images": [
            "projImg25.png",
            "projImg26.png",
            "projImg27.png",
            "projImg28.png"
        ],
        "deployed": false,
        "info": "<h2 id=\"about\">About</h2>\n<p>This is a project I built for a teacher a few years ago to easily be able to give points to students given the period and desk they sit at. It was mainly a way for me to learn nodejs, html, and css.</p>\n<p>It has a student portal where student can select their class period and see how many points they have. It also has a teacher portal which requires a password. In that portal the teacher can give and take points as well as edit names for each class period.</p>\n<h2 id=\"running\">Running</h2>\n<ol>\n<li>run <code>npm install</code></li>\n<li>run <code>node .</code></li>\n</ol>"
    },
    {
        "title": "SquirrelSpace  TAMUHack2023",
        "description": "Squirrel themed team management system for TAMUHack 2023 (winning!) 🐿️",
        "category": "competition",
        "github": "https://github.com/michael-manders/Hackathons/tree/main/TAMUHack",
        "devpost": "https://devpost.com/software/michael-manders-big-fun-time",
        "featured": false,
        "images": [
            "projImg29.jpg",
            "projImg30.jpg",
            "projImg31.jpg"
        ],
        "deployed": false,
        "info": "<h2 id=\"about\">About</h2>\n<p>This is the project my team and I made for the TAMUHack 2023. It was made to compete in the CBRE challenge of organizing teams given floor space and what teams like and dislike each other. It was made with pygame.</p>\n<h2 id=\"demonstration\">Demonstration</h2>\n<p><a href=\"https://www.youtube.com/watch?v=7kwPxQyZSdU\">https://www.youtube.com/watch?v=7kwPxQyZSdU</a></p>\n<h2 id=\"awards\">Awards</h2>\n<p>2nd place CBRE challenge</p>"
    },
    {
        "title": "Tic Tac Toe Robot",
        "description": "TicTacToe robot that plays against you",
        "category": "hardware",
        "github": "https://github.com/michael-manders/Tic-Tac-Toe",
        "featured": false,
        "images": [
            "projImg32.png"
        ],
        "deployed": false,
        "info": "<h2 id=\"about\">About</h2>\n<p>This is some code that turn my cnc router into a tic tac toe robot. It uses a marker where the router bit would usally go to draw the board. Then by using a camera and computer vision it finds where you moved. After that, it decided what the optimal move would be and draws an X there.</p>\n<h2 id=\"demonstration\">Demonstration</h2>\n<p><a href=\"https://youtu.be/qOsUDwOoCaU\">https://youtu.be/qOsUDwOoCaU</a></p>"
    },
    {
        "title": "Time Tracking Renderer",
        "description": "Renders and downloads an image of my time tracking chart",
        "category": "software",
        "github": "https://github.com/michael-manders/time-tracking-renderer",
        "featured": false,
        "images": [
            "projImg33.png"
        ],
        "deployed": "https://michaelmanders.com/builds/Time-Tracking-Renderer/page.html",
        "info": ""
    },
    {
        "title": "WiFi Controlled LED Sign",
        "description": "LED sign controlled over WiFi using ESP3266",
        "category": "hardware",
        "github": "https://github.com/michael-manders/WiFi-Controlled-LED-Sign",
        "featured": false,
        "images": [
            "projImg34.png",
            "projImg35.png",
            "projImg36.png",
            "projImg37.png",
            "projImg38.png",
            "projImg39.png",
            "projImg40.png",
            "projImg41.png"
        ],
        "deployed": false,
        "info": "<p>An LED sign that is controlled over WifI\nComplete with a status LCD screen and control over a simple website</p>\n<h2 id=\"demonstration\">Demonstration</h2>\n<p><a href=\"https://youtu.be/xXT149byX28\">https://youtu.be/xXT149byX28</a></p>\n<h2 id=\"materials\">Materials</h2>\n<ul>\n<li>ESP32</li>\n<li>32x8</li>\n<li>5v Power Supply</li>\n<li>I<sup>2</sup>C LCD Screen</li>\n<li>10uf capacitor</li>\n<li>Breadboards</li>\n</ul>\n<h2 id=\"howtobuild\">How to build</h2>\n<ol>\n<li>Open the LED_Board.ino file in the <a href=\"https://www.arduino.cc/en/software\">Arduino IDE</a></li>\n<li>Install the required libraries:<ul>\n<li>ESP32 WiFi</li>\n<li>Adafruit_GFX</li>\n<li>Adafruit_NeoMatrix</li>\n<li>Adafruit_NeoPixel</li>\n<li>LiquidCrystal_I2C</li>\n<li>Wire</li></ul></li>\n<li>Update the variables in LED_Board.ino</li>\n</ol>\n<pre><code>const char *ssid = \"Wifi Name\";\nconst char *password = \"Password\";\n#define DATA_PIN 4\n#define LED_PIN 5\n#define MATRIX_WIDTH 32\n#define MATRIX_HEIGHT 8\n#define HOSTNAME \"LED-Sign\"\n#define PORT 80\n</code></pre>\n<p>I reccomend leaving the port the default because you won't have to type a port at the end ofthe url. The LED pin refers to the pin of a status led and the data pin refers to the pin that connects to the matrix.</p>\n<p><br></p>\n<ol start=\"4\">\n<li>Wire up the ESP32\nList of connections: - Connect the EN pin to ground through a 10uf capacitor (not necessary but helps if you're having trouble uploading code) - Connect an LED to ground through a 220 ohm resister on the pin defined in your code - Connect the SDA and SCL pins on your LCD screen to the SDA and SCL pins on the ESP32 - Connect ground and 5v to the LED matrix, LCD and ESP32 (for the ESP32 I had to connect 5v through the usb instead of the pins. I'm unsure if this is the case for all models though.) - Connect data to the LED matrix on the pin define in the previous section - Connect up power to the power supply and connect the power supply to the breadboards</li>\n</ol>\n<p><br></p>\n<ol start=\"5\">\n<li><p>To make the box laser cut out all the svg files in the SVG folder. The file titled \"Electronics Box.svg\" contains all the parts in one file, while the other files split it up. After laser cutting slide the power carts, assemble all but one side. Put all the electronics in the box and attach the final side. I recommend doing this in a non-permanent way to avoid having the break the box to fix an issue. You can also glue the LED matrix to the backplate if you want it to be more rigid.</p></li>\n<li><p>Finally put the lid on and you're done!</p></li>\n</ol>\n<h2 id=\"forchangingthehtml\">For Changing the HTMl</h2>\n<p>To update the web page design simply write out everything you want in the HTML file (make sure it is only the 1 file, not using external css or images). Then convert the html into 1 line (I did mine <a href=\"https://www.textfixer.com/html/compress-html-compression.php\">here</a>) then replace all the \" with '. Then replace the HTML line in the LED_Board.ino file.</p>"
    }
];
//<project-list-end>//
        this.categoryLabels = [];
        this.categoryBounds = [];

        this.firstLoad = true;
    }

    componentDidMount() {
        this.generateList();
    }

    makeProjectELement(project) {
        let projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.classList.add(project.category);
        if (project.featured) projectElement.classList.add("featured");
        projectElement.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
        `;

        projectElement.addEventListener("click", () => {
            this.loadProject(project);
        });

        return projectElement;
    }

    makeCategoryElement(category) {
        let categoryElement = document.createElement("h2");
        categoryElement.classList.add("category");
        categoryElement.innerHTML = `
            ${category}
        `;

        return categoryElement;
    }

    runCat(element, start, end) {
        let projectsContainer = document.getElementById("projects-container");
        let elm = projectsContainer.children[start].children[0];
        // elm.style.backgroundColor = "red";

        let top =
            elm.getBoundingClientRect().top -
            document.getElementById("project-home").getBoundingClientRect().top;

        top = Math.max(0, top);

        if (
            projectsContainer.children[end].children[0].getBoundingClientRect()
                .top -
                document.getElementById("project-home").getBoundingClientRect()
                    .top <
            0
        ) {
            console.log("here");
            top =
                projectsContainer.children[
                    end
                ].children[0].getBoundingClientRect().top -
                document.getElementById("project-home").getBoundingClientRect()
                    .top;
        }

        element.style.top = top + "px";
    }

    scrolling() {
        for (let i = 0; i < this.categoryLabels.length; i++) {
            this.runCat(
                this.categoryLabels[i],
                this.categoryBounds[i][0],
                this.categoryBounds[i][1]
            );
        }
    }

    fadeOut() {
        let elms = document.getElementsByClassName("content-container");
        for (let i = 0; i < elms.length; i++) {
            elms[i].style.animation = "fadeOut .25s forwards";
        }
    }

    fadeIn() {
        let elms = document.getElementsByClassName("content-container");
        for (let i = 0; i < elms.length; i++) {
            elms[i].style.animation = "fadeIn .25s forwards";
        }
    }

    generateListWithoutAnimation() {
        // will get the projects and categories
        // starts by sortign the categories by frequency
        // then categorizes the projects by category
        // then will add the projects to the page
        let projectsContainer = document.getElementById("projects-container");
        let categoryContainer = document.getElementById("category-container");

        projectsContainer.addEventListener("scroll", this.scrolling.bind(this));

        let projects = this.projects;
        let categories = [];

        for (let p of projects) {
            categories.push(p.category);
        }

        let letCatSet = new Set(categories);
        // sort by frequency
        letCatSet = Array.from(letCatSet).sort((a, b) => {
            return (
                categories.filter((v) => v === a).length -
                categories.filter((v) => v === b).length
            );
        });

        // sorted by number of projects, ascending
        categories = letCatSet;
        categories = categories.reverse();

        let projectsByCategory = {};
        for (let c of categories) {
            projectsByCategory[c] = [];
        }

        for (let p of projects) {
            projectsByCategory[p.category].push(p);
        }

        for (let c of categories) {
            for (let p of projectsByCategory[c]) {
                projectsContainer.appendChild(this.makeProjectELement(p));
            }
        }

        let i = 0;
        for (let c of categories) {
            let bounds = [i, i + projectsByCategory[c].length - 1];
            this.categoryBounds.push(bounds);
            i += projectsByCategory[c].length;

            c = c[0].toUpperCase() + c.slice(1);

            let e = this.makeCategoryElement(c);
            this.categoryLabels.push(e);
            categoryContainer.appendChild(e);
        }

        this.scrolling();
    }

    generateList() {
        // put correct stuff in home container

        if (this.firstLoad) {
            this.firstLoad = false;
            let mainContainer = document.getElementById("project-home");
            mainContainer.innerHTML = `<div id="category-container" class="content-container"></div>
                                    <div id="projects-container" class="content-container"></div>`;
            this.generateListWithoutAnimation();
        } else {
            this.fadeOut();
            setTimeout(() => {
                let mainContainer = document.getElementById("project-home");
                mainContainer.innerHTML = `<div id="category-container" class="content-container"></div>
                                    <div id="projects-container" class="content-container"></div>`;
                this.generateListWithoutAnimation();
                this.fadeIn();
            }, 250);
        }
    }

    loadProject(project) {
        console.log(project);
        this.fadeOut();
        setTimeout(() => {
            let mainContainer = document.getElementById("project-home");

            let projectsContainer = document.createElement("div");

            mainContainer.innerHTML = "";
            mainContainer.appendChild(projectsContainer);
            projectsContainer.classList.add("content-container");
            projectsContainer.classList.add("project-view");
            let inside = `${project.info}`;
            projectsContainer.innerHTML = `
                    <h1 id="title">${project.title}</h1>
                    <div id="icons">    
                        <div id="back-button">◄</div>
                        <div id="inner-icons">
                        </div>
                    </div>
                    <div id="project-info"> ${1} </div>
            `;
            // fix the height thing
            document.getElementById("inner-icons").style.height = `${
                document.getElementById("title").getBoundingClientRect().height
            }px`;

            // attach icons
            if (project.github) {
                let icon = document.createElement("img");
                icon.href = project.github;
                icon.src = githubImg;
                icon.className = "icon";
                document.getElementById("inner-icons").appendChild(icon);
            }

            if (project.devpost) {
                let icon = document.createElement("img");
                icon.href = project.devpost;
                icon.src = devpostImg;
                icon.className = "icon";
                document.getElementById("inner-icons").appendChild(icon);
            }

            // attach site link
            if (project.deployed) {
                let icon = document.createElement("div");
                icon.href = project.deployed;
                icon.id = "deploy-icon";
                icon.className = "icon";
                icon.innerHTML = "🌐";
                document.getElementById("inner-icons").appendChild(icon);
            }

            // attach event listeners
            let icons = document.getElementsByClassName("icon");
            for (let i of icons) {
                i.addEventListener("click", () => {
                    window.open(i.href, "_blank");
                });
            }

            let elm = document.getElementById("project-info");
            elm.style.height = elm.getBoundingClientRect().height + "px";
            elm.innerHTML = inside;

            let imageDiv = document.createElement("div");
            imageDiv.id = "project-images";
            imageDiv.innerHTML = ``;
            projectsContainer.appendChild(imageDiv);

            // attach back button
            document
                .getElementById("back-button")
                .addEventListener("click", () => {
                    this.generateList();
                });

            this.fadeIn();
        }, 250);
    }

    render() {
        return (
            <PageWrapper>
                <div id="project-home"></div>
            </PageWrapper>
        );
    }
}
