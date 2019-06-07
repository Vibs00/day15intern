const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");

const server = express();

// server.use(express.static('build'));
server.use(express.static('public'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(morgan('tiny'));
server.use(morgan('combined'));
server.use(morgan('common'));
server.use(morgan('dev'));
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }   // make secure : true incase you are using HTTPS
  }))


server.post("/a", (req,res)=>{
    res.json(req.body);
})

server.get("/b", (req,res)=>{
    console.log(req.query.username);
    res.json(req.query);
})

server.get('/user', function(req, res) {
    if (req.session.views) {
      req.session.views++
      res.json({views:req.session.views})
    } else {
      req.session.views = 1
      res.send('welcome to the session demo. refresh!')
    }
  })

server.get("/demo", (req, res)=>{
    res.send("Hello");
})

server.listen(8080, ()=>{
    console.log("Server Started");
})