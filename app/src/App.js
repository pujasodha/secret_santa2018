import React, { Component } from 'react';
import Form from './components/Form/Form'

class App extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    this.getUser();
  }



  getUser = _ => {
    fetch('http://localhost:4000/users')
    .then(response => response.json())
    .then(response => {
      
    })
    .catch(error => {
      console.error(error);
    })
  
}
  

  render() {
    // const { users } = this.state;
    return ( 
  <Form>

  </Form>
    )
  }
}

export default App