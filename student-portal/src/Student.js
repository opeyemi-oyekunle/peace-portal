import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Menu from './Menu'
import Profile from './Profile'
import Scores from './Scores'
import Logout from './Logout'

class Student extends Component {
    render(){
      return(
        <div>
          <Menu />
          <Switch>
          <Route path="/student/profile" component={Profile} />
          <Route path="/student/scores" component={Scores} />
          <Route path="/student/logout" component={Logout} />
          </Switch>
        </div>

      )
    }
}

export default Student
