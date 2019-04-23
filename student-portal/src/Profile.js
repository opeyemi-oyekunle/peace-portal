import React, {Component} from 'react'
import Details from './Details'
import {getId} from './jwt'

class Profile extends Component{
  render(){
    return(
      <div>
        <h2 className="text-center text-uppercase">Profile</h2>
        <Details id={getId()}/>
      </div>
    )
  }
}

export default Profile
