const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser());
const port = 4000;

var mongoDBURL = 'mongodb+srv://vamshi:qG1v#8w!IP&4o9a@babcoin-dyxc1.gcp.mongodb.net/test?retryWrites=true&w=majority';

server.get("/", (req, res) => {
    res.send("hello there");
});

server.get("/:url", (req, res) => {
    switch(req.params.url){
        case "lolwhat" :
            res.send("get rekt");
            break;
        case "never_say_never":
            res.send("justin bieber");
            break;
        default:
            res.send(`${req.params.url}`);
            break;
    }
});

server.get("/lolwhat", (req, res) => {
    res.send("get rekt");
});

server.post("/post", (req, res) => {
    console.log('posting');
    res.send(req.body);
});

server.listen(port, () =>{
    console.log(`server listening at ${port}`);
});