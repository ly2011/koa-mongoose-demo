require("babel-core/register")({
  presets: ["es2015", "stage-0"]
});
require("babel-polyfill");
const config = require("./configs").default;
const app = require("./index.js").default;

// create server
app.listen(config.app.port, () => {
  console.log("The server is running at http://localhost:" + config.app.port);
});
module.exports = app;
