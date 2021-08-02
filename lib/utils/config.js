const fs = require('fs');

module.exports = JSON.parse(fs.readFileSync(process.env.CONFIG_PATH)); // read data and export it so it's config module