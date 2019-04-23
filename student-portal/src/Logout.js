import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {logout} from './jwt'


class Logout extends Component{
  render(){
    logout()
    this.props.history.push('/')
    return(
      <div>
        Logout
      </div>
    )
  }
}

export default Logout
