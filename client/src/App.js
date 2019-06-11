import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from './actions/' //This pull or actions in this file. Now action becomes the object

import Home from './Components/HomePage'
import UsersForms from './Components/Forms/UsersRegistration'
import ExpensesForm from './Components/Forms/addExpenses'
class App extends Component {

  componentDidMount(){
    
   
  }
  render() { 
   
    return (
      <div>
     <UsersForms/>
     <ExpensesForm/>
     <Home/>
      </div>
      );
  }
}
 
const mapstateToProps = (state) => {
  return {
    users: state.users
  }
}

 
export default connect(mapstateToProps, actions) (App);