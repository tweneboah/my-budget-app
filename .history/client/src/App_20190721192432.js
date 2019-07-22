import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Layouts/Navbar';
import Home from './components/Layouts/Home'
import UserRegistration from './components/forms/UserRegistrationForm';
import Login from './components/auth/Login';
import Alerts from './components/pages/Alert';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './redux/reducers';


// const store = createStore(users, composeWithDevTools(applyMiddleware(reduxThunk)) )
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)))


//==========================

function App() {

  //
  useEffect(()=> {
    
  })
  return (

   <Provider store = >
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

    </Provider> 
  );
}

export default App;
