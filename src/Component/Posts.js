import React from "react";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.logOut=this.logOut.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ data: data })
      );
  }

  logOut(){
    localStorage.clear();
    this.props.history.push("/login");
    this.props.changeState();
    this.setState(()=> ({
        active: false
    }))
  }
  render() {
    return (
      <div>
         <p className= "buttonRight">{ this.state.active ? <p> Welcome {this.props.user}</p> : "" }</p>
            <button className="buttonRight" onClick={this.logOut}>Log out</button>
      <div className="text-start">
        <h3>Show Posts from jsonplaceholder</h3>

        {this.state.data.map((d, i) => {
          return (
            <div key={d.id}>
              <p>{d.user}</p>
              <p>{d.id}</p>
              <p>{d.body}</p>
              <p>{d.title}</p>
              <hr/>
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}

export default Posts;
