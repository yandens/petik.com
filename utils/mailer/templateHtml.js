const ejs = require("ejs");

const getHtml = (filename, data) => {
  return new Promise((resolve, reject) => {
    const path = __dirname + "/../../views/email/" + filename;
    ejs.renderFile(path, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = getHtml;
