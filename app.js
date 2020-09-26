const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// // assignment deconstructing. assigns the elements we get from user input, and assigns them to name, and github respectively. 
// // const [name, github] = profileDataArgs;


// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err; 
    
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            messgae: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }
    ])
};

//saves inquirer questions and answers in a function so it can be called whenever you feel like it. 
const promptProject = portfolioData => {

    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
    ==================
    Add a New Project
    ==================
    `);
    // uses inquirer functionality to create question, and save user input answers. 
    return inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input', 
            name: 'description', 
            message: 'Provide a description of the project'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input', 
            name: 'link',
            message: 'Enter the Github link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature', 
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm', 
            name: 'confirmAddProject', 
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject){
            return promptProject(portfolioData);
        }
        else {
            return portfolioData;
        }
    });
}

// calls the above function, and then logs the user's input as answers on the console. 
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });