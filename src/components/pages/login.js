import React from 'react'

import { loginUser } from '../../services/user.service'

import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    
    event.preventDefault();

    loginUser(this.state.email, this.state.password)
      .then((res) => {
        localStorage.setItem('token', res)
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
    <div className="login-card card">
      <h3 className="card-title">Log In</h3>
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input className="login-input login-email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}></input>
        <input className="login-input login-password" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
        <input className="login-input login-submit" placeholder="" type="submit"></input>
      </form>
    </div>
    )
  }
}

export default Login