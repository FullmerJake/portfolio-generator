const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

// assignment deconstructing. assigns the elements we get from user input, and assigns them to name, and github respectively. 
const [name, github] = profileDataArgs;


fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw new Error(err); 
    
    console.log('Portfolio complete! Check out index.html to see the output!');
});