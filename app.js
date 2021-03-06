const inquirer = require('inquirer');
const {writeFile, copyFile} = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');


// // assignment deconstructing. assigns the elements we get from user input, and assigns them to name, and github respectively. 
// // const [name, github] = profileDataArgs;


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            messgae: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter your Github Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: false
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself',
            when: ({ confirmAbout }) => {
                if (confirmAbout){
                    return true;
                }
                else {
                    return false;
                }
            }
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
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input', 
            name: 'description', 
            message: 'Provide a description of the project',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter a description!');
                    return false;
                }
            }
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
            message: 'Enter the Github link to your project. (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter your Github link!');
                    return false;
                }
            }
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
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

