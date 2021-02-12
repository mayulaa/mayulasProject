import React from 'react';
import "./style.css";


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            message:"",
            textMessage:[],
            username:"",
            textUsername:""
         }
         this.addMessage=this.addMessage.bind(this);
         this.sendMessage=this.sendMessage.bind(this);
         //this.sendUsername=this.sendUsername.bind(this);
        }

    addMessage(e){
        this.setState(()=>({
            [e.target.name]: e.target.value 
        }))
    }

    sendMessage(){
    // tuka emituva i posle za da nema nov lisstener na sekoj klik go stavame vo comp.did mount
        this.props.socket.emit("sendMessage", {message: this.state.message, mail:this.props.user.mail} )
    }
   /* sendUsername(){
        this.props.socket.emit("sendUsername", {username: this.state.username})
    }*/

    componentDidMount(){
        this.props.socket.on("newMessage", data=>{
            if(data.msg){ 
               // console.log(this.state.textMessage, data.msg);
                this.setState(()=> ({ 
                    //textUsername:this.props.user,
                    textMessage: [...this.state.textMessage, {textUsername:data.username, message:data.msg}],
                    message: ""
                    })
                    )
                    console.log(this.state.textMessage);
            }
        })
    }

    render() { 
        console.log("Ova e state",this.state);
        return (
            <div className="text-center">
                <div className="border border-primary chatHeight">
                    {this.state.textMessage.map( (obj, id) => {
                        return (<p>
                           {obj.textUsername}:{obj.message};
                        </p>)
                    })}
                    
                </div>

                <div className="chatRoom">
               {/*   ova e za da si piseme sami usernames
                <input
                type="text"
                placeholder="Change Username"
                value={this.state.username}
                onChange={this.addMessage}
                name="username"
                />
                <button onClick={this.sendUsername}> Send Username</button>
               */}

                <input
                type="text"
                placeholder="Enter your message"
                value={this.state.message}
                onChange={this.addMessage}
                name="message"
                />
                <button onClick={this.sendMessage}> Send Message</button>
            </div>
            </div>
          );
    }
}
 
export default ChatRoom;