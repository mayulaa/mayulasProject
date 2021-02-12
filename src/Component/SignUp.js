import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <div className="text-center">

        <form onSubmit={this.props.handleSignUp}>
        <h2>Sign up</h2>
        <i>Create a yahoo email adress</i>
        <br />
        <input
          type="text"
          placeholder="Enter your name"
          value={this.props.name}
          onChange={this.props.enterData}
          name="name"
        />

        <input
          type="text"
          placeholder="Enter your surename"
          value={this.props.surename}
          onChange={this.props.enterData}
          name="surename"
        />
        <br />
        <input
          type="text"
          placeholder="Enter your mail        @yahoo.com"
          value={this.props.mail}
          onChange={this.props.enterData}
          size="46"
          name="mail"
        />
        <br />
        <p>
          <a href="#">I want to use my current email address</a>
        </p>
        <input
          type="password"
          placeholder="Enter your password"
          value={this.props.password}
          onChange={this.props.enterData}
          size="46"
          name="password"
        />
        <br />

        <select name="prefix" id="prefix">
          <option value="macedonia">+389</option>
          <option value="serbia">+381</option>
          <option value="bulgaria">+382</option>
          <option value="greece">+384</option>
        </select>

        <input
          type="text"
          placeholder="Enter your phone"
          value={this.props.phone}
          onChange={this.props.enterData}
          size="37"
          name="phone"
        />
        <br />
        <p>
          By clicking "Continue", you agree to the Terms <br /> and Privacy
          Policy
        </p>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
