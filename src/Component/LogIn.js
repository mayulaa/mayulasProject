import React from "react";

class LogIn extends React.Component{
    render(){
        return(
            <div className="text-center">
                <h2>Login</h2>
     <form onSubmit={this.props.handleSubmit}>
     <input
      type="text"
      placeholder="Enter your username"
      value={this.props.loginUsername}
      onChange={this.props.addLoginData}
      name="loginUsername"      
      />
      <br/><br/>
      <input
      type="password"
      placeholder="Enter your password"
      value={this.props.loginPassword} 
      onChange={this.props.addLoginData}
      name="loginPassword"     
      />
      <br/><br/>
     
     <input 
     type="checkbox"
     value={this.props.rememberMe}
     checked={this.props.rememberMe}
     onChange={this.props.handleCheck}
     name="rememberMe"
     /> Remember Me
      <br/><br/>
      <button type="submit" className="btn btn-primary"> Sign In</button>
      </form>
            </div>
        )
    }
}
export default LogIn;