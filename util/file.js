const fs = require('fs');

const deleteFile = (filePath) => {
    //unlink delete the file at this path (filePath)
    fs.unlink(filePath, (err) => {
        if(err){
            throw (err);
        }
    })
}

exports.deleteFile = deleteFile;