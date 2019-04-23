import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

class SignUp extends Component{
  constructor(){
    super()
    this.state = {
      userData: {'name':null, 'email':null, 'gender':null, 'password':null},
      redirect:''
    }
    this.sendData = this.sendData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e)=>{
    this.setState({
        userData:{
          // [e.target.id]:e.target.value
          name:document.form.name.value,
          email:document.form.email.value,
          gender:document.form.gender.value,
          password:document.form.password.value
        }
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    this.sendData(this.state.userData);
  }

  sendData  = (userData) => {
    axios.post('/api/signUp', userData)
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          redirect:'Login with the code sent to you'
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
        <h1>SignUp</h1>
        <form onSubmit={this.handleSubmit} name="form">
        <div>
          <label htmlFor="name">Name</label>
          <input type="name" id="name" onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email"  onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender"  onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.handleChange} autoComplete='off'/>
        </div>
        <button type="submit">SignUp</button>
        </form>
      </div>
    )
  }
}

export default SignUp
