import React, {Component} from 'react'
import SignUp from './SignUp'
import Login from './Login'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Row, Col } from 'react-bootstrap'

class Home extends Component{
  render(){
    return(
      <Row>
        <Col><Login/></Col>
        <Col><SignUp/></Col>
      </Row>
    )
  }
}

export default Home
