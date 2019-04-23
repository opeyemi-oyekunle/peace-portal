import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Student from './Student'
import VerifyAccount from './VerifyAccount'
import ProtectComponent from './ProtectComponent'

class App extends Component {
    render(){
      return(
        <div>
          <Switch>
            <Route path="/verifyAccount/:email/:token" component={VerifyAccount} />
            <ProtectComponent>
              <Route exact path="/" component={Home} />
              <Route path="/student" component={Student} />
            </ProtectComponent>
          </Switch>
        </div>

      )
    }
}

export default App
