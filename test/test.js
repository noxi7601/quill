const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server listening at 8080");
    app.use(express.static("./"));
});
