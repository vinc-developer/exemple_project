require("dotenv").config();
const log = require("./log/logger");
const express = require("express");

const app = express();
const port = process.env.port || 5000;

const server = require("http").createServer(app);

app.use(express.json());

// routes principales
app.use("/user", require("./routes/user"));

try{
    server.listen(port, () => {
        log.info("Server listening on port : " + port);
    });
} catch(e) {
    log.error("Error listening on port : " + port);
}
