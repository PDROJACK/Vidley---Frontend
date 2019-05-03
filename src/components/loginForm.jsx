import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };
  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            value={account.username}
            name={"username"}
            label="Username"
          />
          <Input
            onChange={this.handleChange}
            value={account.password}
            name={"password"}
            label={"Password"}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
