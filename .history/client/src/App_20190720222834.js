import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Layouts/Navbar';
import Home from './components/Layouts/Home'
import UserRegistration from './components/forms/UserRegistrationForm';
import Login from './components/auth/Login';
import Alerts from './components/pages/Alert'

//Runing the userloaded method
import  { loadUser } from  './redux/actions/auth'

//========LOADE USER METHOD FROM ACTION===============
if(localStorage.token){
  setAuthToken(localStorage.token)
}
//==========================

function App() {

  //
  useEffect(())
  return (
    <Router>
        <div className="App">
            <Navbar/>
            
           <Route exact path = '/' component = {Home}/>
        <section className ='container'>
          <Alerts/>
           <Switch>
           
              <Route exact path = '/register' component = {UserRegistration}/>
              <Route exact path = '/login' component = {Login}/>

           </Switch>
           </section>
        </div>
    </Router>
  );
}

export default App;
