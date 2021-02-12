import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Navigation from "./Navigation";
import Posts from "./Posts";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import "./style.css";
import Gallery from "./Gallery";
import Home from "./Home";
import ChatRoom from "./ChatRoom";
import { PrivateRoute,AuthRoute } from "./Routes";
import jwt from "jwt-decode";
import socketIOClient from "socket.io-client";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUsername: "",
      loginPassword: "",
      rememberMe: false,
      name: "",
      surename: "",
      mail: "",
      password: "",
      phone: "",
      user:{},
      response:"",
      roomId:""

    };
    this.addLoginData = this.addLoginData.bind(this);
    //this.addLoginPassword=this.addLoginPassword.bind(this);
    this.enterData = this.enterData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.changeState=this.changeState.bind(this);

    this.socket = socketIOClient.connect("http://localhost:3001", {
      query: {}
    });
  }

  handleCheck = (e) => {
    this.setState(() => ({
      [e.target.name]: e.target.checked,
    }));
  };

  addLoginData(dataLogIn) {
    this.setState(() => ({
      [dataLogIn.target.name]: dataLogIn.target.value,
    }));
  }

  enterData(data) {
    console.log(data.target.name);
    this.setState(() => ({
      [data.target.name]: data.target.value,
    }));
  }

  handleSubmit = (e) => {
    //console.log(this.state);
    e.preventDefault();
    localStorage.setItem("rememberMe", this.state.rememberMe);
    localStorage.setItem(
      "loginUsername",
      this.state.rememberMe ? this.state.loginUsername : ""
    );

    fetch("http://localhost:3001/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //body go prakjame kon node, i tamu node vrakja res.json({Success: "True"});
      body: JSON.stringify({
        loginUsername: this.state.loginUsername,
        loginPassword: this.state.loginPassword,
      }), // body data type must match "Content-Type" header
    })
      //go pretvarame payload vo json
      .then((res) => res.json())
      .then((res) => {console.log(res)
     if(res.User){
       //setiranje na token
      localStorage.setItem("login_Token", res.token);
      //dekodiranje na token sto ni e zacuvan i setiranje na bilo sto da ni treba sto ima vo toj payload na token,
      //vo ovoj slucaj decode.user go zemame cel so site info sto sme gi sacuvale za user
      var decoded=jwt(res.token);
      console.log(decoded);
      this.setState(()=>({
        user: decoded.user
      }))
      console.log(this.state.user);
      this.props.history.push("/gallery");
     }
     else{
       console.log("Erooorr")
     }
      });
  };
  
  changeState(){
    this.setState(()=>({
    user: {}
    }))
    }
  /*
  componentDidMount(){
      fetch("http://localhost:3001/todo")
      .then((res)=>(res.json()))
      .then(res=>{console.log(res)
        this.setState(()=>({
          todo:res.todo,
        }))
      })   
    
  }
*/
  handleSignUp(e) {
    console.log("Dali stigna")
    e.preventDefault();

    fetch("http://localhost:3001/signup", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: this.state.name,
        surename: this.state.surename,
        mail: this.state.mail,
        password: this.state.password,
        phone: this.state.phone,
      }), // body data type must match "Content-Type" header
    })
    .then((res)=>res.json())
    .then((res)=>{console.log(res)
    
      if(res.Register){
        this.props.history.push("/login");
      }
      else{
        console.log("Obidete se so drug mail")
      }
    })
   
    ;}


//za da ne se brise posle refresh na page  imeto na userot
    componentDidMount(){
      try{
      var getToken=localStorage.getItem("login_Token");
      var decoded=jwt(getToken);
      console.log(decoded);
      this.setState(()=>({
        user: decoded.user
      }))
    }
    catch(err){
      console.log(err)
    }
   
      this.socket.on("error", (message)=>{
        console.log(message);
      })
      this.socket.on("connect", ()=>{
        console.log("Povikana connect")
/*
        this.socket.on("fromApi", data =>{
          console.log(data);
          this.setState(()=>({
            response:data
          }))
        })
     
  */
    
    })
  }
  render() {
    console.log(this.state);
    return (
      <div className="text-center">
        {
          //go prakjame cel user so site zacuvani info
        }
        <Navigation user={this.state.user}/>
        <Switch>
          <Route exact path="/" component={Home} />
          
          <AuthRoute
            exact
            path="/Login"
            component={LogIn}
            handleSubmit={this.handleSubmit}
                addLoginData={this.addLoginData}
                handleCheck={this.handleCheck}
                loginUsername={this.state.loginUsername}
                loginPassword={this.state.loginPassword}
                rememberMe={this.state.rememberMe}

          />
          <AuthRoute
            exact
            path="/SignUp"
            component={SignUp}
                handleSignUp={this.handleSignUp}
                name={this.state.name}
                surename={this.state.surename}
                mail={this.state.mail}
                password={this.state.password}
                phone={this.state.phone}
                enterData={this.enterData}
           
          />
          <PrivateRoute exact path="/Posts" component={Posts} user={this.state.user.name} changeState={this.changeState}/>
          <PrivateRoute exact path="/Gallery" component={Gallery} user={this.state.user.name} changeState={this.changeState}
          socket={this.socket}
          />
          <PrivateRoute exact path="/ChatRoom" component={ChatRoom} socket={this.socket} user={this.state.user}/>
        </Switch>

      <h4>Its {this.state.response} </h4>

        {/* 
        <LogIn
          loginUsername={this.state.loginUsername}
          loginPassword={this.state.loginPassword}
          addLoginData={this.addLoginData}
        />

        <SignUp
        name={this.state.name}
        surename={this.state.surename}
        mail={this.state.mail}
        password={this.state.password}
        phone={this.state.phone}
        enterData={this.state.enterData}
        />
         */}
      </div>
    );
  }
}
//export default App;
export default withRouter(App);