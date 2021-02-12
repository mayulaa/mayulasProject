const { prototype } = require("events");
var bodyParser = require("body-parser");
var cors = require("cors");
var db = require("./db-connection");
var bcrypt = require("bcrypt");
var jwt=require("jsonwebtoken");
const http=require("http");
const express = require("express");
const con = require("./db-connection");
const { verify } = require("crypto");
const app = express();
const port = 3001;
let users = [];

const server=http.Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

app.use(bodyParser.json());
app.use(cors());

//app.use(bcrypr());

/*
app.get("/todo", (req,res)=>{
    var sql=`SELECT * FROM todo.todoList`
    var query=db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        else {
            res.json({todo:result});
            console.log(result)
        }
    })
})

app.get("/createdb",(req,res)=>{
    var sql=`create database pets`;
    db.query(sql,(err,result)=>{
        if(err){
            res.send("Alredy exists")
            }
        else{
            console.log(result);
            res.send("database created")
           
        }
    })
})
*/



let clients=[];
io.on("connection", function (socket) {
clients.push(socket)

let interval;

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("fromApi", response);
};

//Slusa za pet data
socket.on("addPet", ({name,age,size_in_cm}) =>{

  var sql ="insert into pet value(null,'"+name +"', "+age+", "+size_in_cm +")";
  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    socket.emit("petName", name );
  });
})

/*Slusa za username
var socketUsername="Anonymus";
socket.on("sendUsername", ({username}) =>{
socketUsername=username;
})
*/

//Slusa za chat
socket.on("sendMessage", ({message,mail}) =>{
 console.log(message);
var sql=`select name from user where mail="${mail}"`

db.query(sql, (err,result)=>{
  if(err)  {throw err;}

  else{
  var name=result[0].name;
  console.log(typeof(name), name);
  clients.forEach(socket =>
    socket.emit("newMessage",{username:name, msg:message})
    )
  }
})

});

})


app.get("/createTable", (req, res) => {
  var sql =
    "create table pet (id int not null auto_increment, name varchar(20) not null, аge int not null, size_in_cm int not null, primary key(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("Create table");
  });
});

app.get("/insertTable", (req, res) => {
  var post = [
    [null, "cat", 2, 40],
    [null, "dog", 4, 89],
  ];
  var sql = "insert into pet values ?";
  //(name,age,size_in_cm)values('dog','5','89'),('cat','3','35')";
  db.query(sql, [post], (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("Succesfully inserted into table");
  });
});
/*
app.post("/petData", verifyToken,(req, res) => {
  var name = req.body.name;
  var age = req.body.age;
  var size_in_cm = req.body.size_in_cm;

  var sql ="insert into pet value(null,'"+name +"', "+age+", "+size_in_cm +")";
  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.json({ Pet: name });
  });
});
//Format of token 
//Authorisation: Bearer <token>

function verifyToken(req,res,next){
//get auth header value
console.log(req.headers);
const bearerHeader=req.headers["authorization"];
console.log(typeof (bearerHeader));
//check if bearer is undefined
if(typeof bearerHeader !== "undefined"){
    console.log("Vo if sme sega");
//split at the space to take <access_token>
const bearer=bearerHeader.split(" ");
//get token from array
const bearerToken=bearer[1];
//set the token
 req.token=bearerToken;
 try{
 var decoded=jwt.verify(req.token,"secretkey") 
 }
 catch(err){
  console.log(err);
  return res.send(err)
 }
 //console.log(decoded)
 next();
}
else {
    //Forbidden
    console.log("Vo else sme sega");
    res.status(403).send("Status 403- forbidden")
}
}
*/
app.get("/", (req, res) => {
  res.send("My first Node app");
});

app.post("/login", async (req, res) => {
  try {
    var mail_loggin = req.body.loginUsername;
    var password_loggin = req.body.loginPassword;

    var doesExists = `select * from user where mail="${mail_loggin}"`;
    
    db.query(doesExists, async (err, result) => {
      if (result.length == 0) {
        console.log("User doesnt exist in databse");
        res.json({ User: false });
      } else {
        //prvo sto ke go najde so toj mail
        var user = result[0];
        const validPass = await bcrypt.compare(password_loggin, user.password);
        if (validPass) {
          //go zemame tokenot i vo {user: tuka def sto sakame da ima vo payload na token dali cel user ili samo name, mail i sl.}
            jwt.sign({user:user}, "secretkey", {expiresIn: "30s"}, (err,token)=>{
                if(err){
                    res.send("Se sluci error");
                    }
                else{
           // tuka vo token imame se sto sme pratile pogore so sign.
            res.json({ token , User: true, Name:user.name});
            console.log("User exist, go on gallery page");
            }
            }) 
            }
        else {
          console.log("password isnt correct");
        }
      }
    });
  } catch (e) {
    console.log("Throw err");
  }

});

/*
    var username=users.find(({mail,password})=>mail===req.body.loginUsername && password===req.body.loginPassword)
    
    if(!username){
        console.log("User"+username +"doesnt exist");
        res.json({Login: "false"})
    }
    else {
        console.log("Login success", username.name);
         res.json({User: username});
    }*/

app.post("/signup", async (req, res) => {
  try {
    var name = req.body.name;
    var surename = req.body.surename;
    var mail2 = req.body.mail;
    var password = req.body.password;
    var phone = req.body.phone;

    var doesExists = `select mail from users.user where mail="${mail2}"`;

    db.query(doesExists, async (err, result) => {
      console.log(err, result);

      if (result.length == 0) {
        password = await bcrypt.hashSync(password, 10);
        // await.db("users").insert({name: name, surename:surename, mail:mail, password:password, phone:phone})
        var sql ="insert into user values(null, '"+name+"', '" +surename+"', '"+mail+"', '" +password+"', " +phone+")";

            db.query(sql, (err, result) => {
            // console.log(err, result);
            console.log(result);
            res.send({ Register: true });
            });
            } 
      else {
        console.log("User already exists");
        res.send({ Register: false, Message: "User already exists" });
      }
    });
  } catch (e) {
    res.json("Something's wrong");
  }
});
/*
    var mail=users.find(({mail})=>mail===req.body.mail);
    
        if(!mail){
            users.push(req.body)
            //za terminal da gledame so ima
            console.log("Register", req.body.mail, users);
            res.json({Register:"true"})
        }
        else{
            console.log("This email alredy exists");
            res.json({Register:"This email alredy exists"})
        
            }
     
    
})
*/

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


server.listen(port, () => console.log("Listening on port" + port));
