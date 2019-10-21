const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

// connect to mongodb
var mongoDB = "mongodb://127.0.0.1/concepts";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "error in mongodb connections"));

// load the db model
require("./models/Concept");
const Concept = mongoose.model('concepts');

// middleware: express handlebars
app.engine('handlebars', exhbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// middleware: body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//middleware for method-override
app.use(methodOverride('_method'));


// simple routes
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/concepts/list", (req, res) => {
    res.render("concepts/list");
});
app.get("/concepts/add", (req, res) => {
    res.render("concepts/add");
});


// POST request from add
app.post("/concepts", (req, res) => {
    console.log(req.body);
    var c = {
        title: req.body.title,
        details: req.body.details
    };
    new Concept(c)
        .save()
        .then(concept => {
            res.redirect("/concepts");
        });
});

// list all concepts
app.get('/concepts', (req, res) => {
    Concept.find({})
        .sort({ date: 'desc' })
        .then(concepts => {
            res.render('concepts/list', { concepts: concepts });
        });
});

// navigate to concept list with id
app.get('/concepts/edit/:id', (req,res)=>{
    Concept.findOne({_id:req.params.id})
    .then(concept=>{
        res.render('concepts/edit', {concept:concept});
    });
});

// put - update: edit the concept with id
app.put('/concepts/:id', (req,res)=>{
    Concept.findOne({_id:req.params.id})
    .then(concept=>{
        concept.title=req.body.title;
        concept.details=req.body.details;
        concept.save()
        .then(concept=>{
            res.redirect('/concepts');
        });
    });
});

// delete concept
app.delete('/concepts/:id', (req, res)=>{
    Concept.remove({_id:req.params.id})
    .then(()=>{
        res.redirect('/concepts');
    });
});

// assign port and listen
const port = 5000;
app.listen(port, () => {
    console.log("server listening on port " + 5000);
});