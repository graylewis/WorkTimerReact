import React from 'react';

import { registerUser } from '../../services/user.service'

import { Redirect } from 'react-router-dom'

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, first, last } = this.state

    registerUser(email, password, first, last)
      .then((res) => {
        this.setState({ loggedIn: true })
      })
      .catch(err => console.log(err))
  }

  handleChange(event) {
    const target = event.target;
    const { value, name } = target

    this.setState({
      [name]: value
    });

    console.log(this.state)
  }

  render() {
    if (this.state.loggedIn === true) {
      return (<Redirect to="/timer" />)
    }
    return (
      <div className="register-card card">
        <h3 className="card-title">Create an Acccount</h3>
        <form className="register-form" onSubmit={this.handleSubmit}>
          <input className="register-input register-email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}></input>
          <input className="register-input register-password" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
          <input className="register-input register-confirm" placeholder="Confirm Password" name="confirm" type="password" value={this.state.confirm} onChange={this.handleChange}></input>

          <div className="names-container">
            <input className="register-input register-first" name="first" placeholder="First Name" value={this.state.first} onChange={this.handleChange}></input>
            <input className="register-input register-last" name="last" placeholder="Last Name" value={this.state.last} onChange={this.handleChange}></input>
          </div>
          <input className="register-input register-submit" placeholder="" type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Register