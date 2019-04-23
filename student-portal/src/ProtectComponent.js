import React, {Component} from 'react'
import axios from 'axios'
import {getJwt} from './jwt'
import { withRouter } from 'react-router-dom';

class ProtectComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: undefined
    }
  }
  componentDidMount(){
    const jwt = getJwt()
    if (!jwt) {
        this.props.history.push('/')
    }
    axios.get('/students', {headers: {Authorization: `jwt ${jwt}`}})
    .then(res=>this.setState({user:res.data}))
    .catch((err) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('id')
      this.props.history.push('/')
    })
  }

  render(){
    if (this.state.user === undefined) {
      return(
        <h2>Loading...</h2>
      )
    }
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(ProtectComponent)
