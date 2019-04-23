import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


class Login extends Component{
  constructor(){
    super()
    this.state = {
      userData: {'email':null, 'password':null},
      redirect:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e)=>{
    this.setState({
        userData:{
          email:document.loginForm.loginEmail.value,
          password:document.loginForm.loginPassword.value
        }
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('/api/login', this.state.userData)
    .then((response) => {
      if (response.status === 200 && (response.data.length >= 1)) {
        this.setState({
          redirect:<Redirect to='./student'/>
        })
        localStorage.setItem('accessToken', response.data[0].token)
        localStorage.setItem('id', response.data[0].id)
      }else{
        this.setState({
          redirect:'Try again'
        })
      }
    })
    .catch((error) => {
      this.setState({
        redirect:'Please try again'
      })
    });
  }


  render(){
    return(
      <div>
      {this.state.redirect}
        <h1>Login </h1>
        <form onSubmit={this.handleSubmit} name="loginForm">
        <div>
          <label htmlFor="loginEmail">Email</label>
          <input type="email" id="loginEmail"  onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input type="password" id="loginPassword" onChange={this.handleChange} autoComplete='off'/>
        </div>
        <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
