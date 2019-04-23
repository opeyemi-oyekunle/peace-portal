import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Menu extends Component {
    render(){
      return(
        <div>
          <ul>
            <li><NavLink to="/student/profile">Profile</NavLink></li>
            <li><NavLink to="/student/scores">Scores</NavLink></li>
            <li><NavLink to="/student/logout">Logout</NavLink></li>
          </ul>
        </div>

      )
    }
}

export default Menu
