const express = require("express")
const mysql = require("mysql")
const dotenv = require("dotenv")
const path = require("path")
const bodyParser = require("body-parser")
const app = express()

dotenv.config({path: './.env'})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/register", (req,res)=> {
    res.sendFile(__dirname+"/register.html")
})


app.get("/login", (req,res)=>{
    res.sendFile(__dirname+"/login.html")
}) 

app.post("/register", (req,res)=> {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let mobile = req.body.mobile;

    // const {name,password,email,mobile} = req.body;

    const q = "INSERT INTO `lamadev`.`mywebsite` (`username`, `password`, `email`, `mobile`) VALUES (?);"
    const VALUES = [name,password,email,mobile]
    db.query(q,[VALUES],(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
     })
})

app.listen(3030, ()=>{
    console.log("server is running on port 3030");
})
