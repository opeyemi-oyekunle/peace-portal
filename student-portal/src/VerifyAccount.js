import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class VerifyAccount extends Component{
  constructor(props){
    super(props)
    this.state = {verifyMessage:'', link:''}
  }
  componentWillMount(){
    axios.get(`/api/verifyAccount/${this.props.match.params.email}/${this.props.match.params.token}`)
    .then(data=>{
      console.log(data);
      if (data.status === 200 && data.data) {
        this.setState({
          link:<Link to='/'>Login/Signup</Link>,
          verifyMessage:'Your account has been activated. Go to the login page '
        })
      }else{
        this.setState({
          link:<Link to='/'>login/signup</Link>,
          verifyMessage:`Sign up if you don't have an account `
        })
      }
    })
    .catch( (error)=> {
      if (error.response.status === 500) {
        this.setState({
          link:<Link to='/'>login/signup</Link>,
          verifyMessage:`Sign up if you don't have an account `
        })
      }
    });
  }

  render(){
    return(
      <div>
        <h1>Verify Account</h1>
        {this.state.verifyMessage}
        {this.state.link}
      </div>
    )
  }
}

export default VerifyAccount
