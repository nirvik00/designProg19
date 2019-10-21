const express=require('express');
const fs=require("fs");
const exhbs=require("express-handlebars");
const app=express();

app.use("/static", express.static(process.env.PWD+"/static"));

app.engine('handlebars', exhbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

function readData(){
    var rawdata=fs.readFileSync("file.json");
    var data=JSON.parse(rawdata);
    console.log(data);
    return data;
}

function writeFile(data){
    data[0]["midname"]="mid";
    data[1].mname="random";
    data[2].fname="js";

    var data0=JSON.stringify(data);
    fs.writeFileSync("file1.json",data0);
}

var Data=readData();
writeFile(Data);

app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/about", (req, res)=>{
    res.send("About page");
});

const port=5000;
app.listen(port, ()=>{
    console.log("server started on port" + port);
});