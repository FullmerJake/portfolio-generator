const fs = require('fs');

// 
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there is an error, reject the Promise and send the error to the Promise's catch() method
            if (err){
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidently execute the resolve() function as well
                return;
            }
            
            // if everything went well, resolve the Promise and send the successful data to the '.then()' method
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

const copyFile  = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err){
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Stylesheet Copied!'
            });
        });
    });
};

// Shorthand property names. If the property key name is the same name as the value, you can just say the name and it will udnerstand its the same for property and key. 
module.exports = { writeFile, copyFile };