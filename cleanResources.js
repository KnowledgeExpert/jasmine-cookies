const fs = require('fs');
const p = require('path');

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(fileName){
            const currentPath = p.join(path, fileName);
            if (fs.lstatSync(currentPath).isDirectory()) { // recurse
                deleteFolderRecursive(currentPath);
            } else { // delete file
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(path);
    }
}

process.argv.splice(2).forEach(path => {
    console.log('Deleting folder ' + path);
    deleteFolderRecursive(path);
});
