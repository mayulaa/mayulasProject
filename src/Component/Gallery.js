import React from 'react';
import "./style.css";
import {withRouter} from "react-router-dom"

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            age:"",
            size_in_cm:"",
            textPet:"",
            flag:false,
            textErr:"Session has expired, log in again!!!",
            flagErr:false,
            active:true
         }
         this.handlePets=this.handlePets.bind(this);
         this.sendPetData=this.sendPetData.bind(this);
         this.logOut=this.logOut.bind(this);
         this.chatRoom=this.chatRoom.bind(this);
    }
    handlePets(e){
        this.setState(()=>({
            [e.target.name]: e.target.value
        })
        )
    }
/*
    sendPetData(e){
        e.preventDefault();
        fetch("http://localhost:3001/petData",{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("login_Token")}`,
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              name: this.state.name,
              age:this.state.age,
              size_in_cm:this.state.size_in_cm
            }), // body data type must match "Content-Type" header
          })
          .then (res=>res.json())
          .then(res=>{console.log(res)
            if(res.Pet){
            this.setState(()=>({
                textPet: res.Pet,
                flag: true,
                flagErr: false
            }))
        }
            else{
                this.setState(()=>({
                    flagErr: true,
                    flag:false
                }))
            }
        });
    }
*/

sendPetData(e){
    e.preventDefault();
   this.props.socket.emit("addPet",{
          name: this.state.name,
          age:this.state.age,
          size_in_cm:this.state.size_in_cm}
      )
      this.props.socket.on("petName", name=>{
      if(name){
        this.setState(()=>({
            textPet: name,
            flag: true,
            flagErr: false
        }))
    }
        else{
            this.setState(()=>({
                flagErr: true,
                flag:false
            }))
        }
    });
}

    logOut(){
      localStorage.clear();
      this.props.history.push("/login");
      this.props.changeState();
      this.setState(()=> ({
          active: false
      }))
    }

    chatRoom(){
        this.props.history.push("/chatRoom");
    }

    render() { 
        return (
            <div>
                <p className= "buttonRight"> {this.state.active ? <p> Welcome {this.props.user}</p> : ""}</p>
            <button className="buttonRight" onClick={this.logOut}>Log out</button>
            <div className="text-center">
                <h2>Welcome to our personal Gallery</h2>
               
                 <div>Pet Name:</div>
                 <input
                    type="text"
                    placeholder="Enter pet name"
                    value={this.state.name}
                    name="name"
                    onChange={this.handlePets}
                />

                <div>Pet age:</div>
                <input
                    type="text"
                    placeholder="Enter pet age"
                    value={this.state.age}
                    name="age"
                    onChange={this.handlePets}
                />

                <div>Pet size in cm:</div>
                <input
                    type="text"
                    placeholder="Enter pet size in cm"
                    value={this.state.size_in_cm}
                    name="size_in_cm"
                    onChange={this.handlePets}
                />
                <br/>
                <button onClick={this.sendPetData}>Send Data</button>
                <br/><br/><br/>
                <hr/>
               { this.state.flag ? <h3>Successfuly added <u>{this.state.textPet}</u> in databases</h3> : ""}
               { this.state.flagErr ?  <h3>{this.state.textErr}</h3> : ""} 
                <br/><br/>

              
                <button on onClick={this.chatRoom} >Go to chat room</button>
            </div>
            </div>
          );
    }
}
 
export default withRouter(Gallery);