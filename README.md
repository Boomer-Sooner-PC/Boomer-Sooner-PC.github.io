# Personal Website Project

### > Work in progress <

## About

This is my personal website designed to be hosted on GitHub pages. It is built using Gatsby so I can learn React. It also hosts some projects I have that are not built using Gatsby, but are still moved to the build directory.

## How to set up

-   have node.js installed
-   have python installed
-   have gatsby.js installed

1. cd into the /src folder and run `npm install -i`
2. cd back into the parent directory
3. run `compile.py`

## Deployment

This GitHub repo has 2 branches (main and gh-pages). I push all the code to the main branch so it can be viewed here. I push just the code from the build directory to the gh-pages using the command: `git subtree push --prefix build origin gh-pages`. I have switched the branch GitHub pages deploys from to the gh-pages branch.
