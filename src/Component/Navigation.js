import React from "react";
import {Link} from 'react-router-dom';
import "./style.css";


class Navigation extends React.Component{
render(){
    return(
        <div className="align-middle">
           
         <ul>    
        <nav class="navbar navbar-dark bg-dark">
        <Link to="/" class="nav-item nav-link">Home</Link>

       {this.props.user.name ? "" :<Link to="/login" class="nav-item nav-link">Login</Link>}
       {this.props.user.name?  "" :<Link to="/signup" class="nav-item nav-link">Sign Up</Link> }
        <Link to="/posts" class="nav-item nav-link">Posts</Link>
        
       
        </nav>
       </ul>
       </div>
    )
}
}
export default Navigation;
