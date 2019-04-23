import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'

class Details extends Component{
  constructor(){
    super()
    this.state = {
      userData:[],
    }
  }
  componentDidMount(){
    axios.get(`/students/${this.props.id}`)
    .then(userData=>{
      this.setState({userData:userData.data})})
    .catch((err) => console.log(err))
  }
  render(){
    let details = null;
    if (this.state.userData.length >= 1) {
       details = this.state.userData.map((detail, key)=>{
        return(
          <Table key={key} striped bordered hover>
            <tbody>
              <tr><td>Name:</td><td>{detail.name}</td></tr>
              <tr><td>Email:</td><td>{detail.email}</td></tr>
              <tr><td>Gender:</td><td>{detail.gender}</td></tr>
              <tr><td>User Type: </td><td>{detail.userType}</td></tr>
            </tbody>
          </Table>
        )
      })
    }
    return(
      <div>
        {details}
      </div>
    )
  }
}

export default Details
