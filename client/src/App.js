import React,{ useEffect, useContext } from 'react';
import Login from './components/UserPages/Login'
import Register from './components/UserPages/Register'
import NavigationBar from './components/Navigation/NavigationBar'
import HomePage from './components/Home/HomePage'
import DashBoard from './components/UserPages/DashBoard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {GlobalContext } from './context/GlobalState'

function App() {

    const { getUser } = useContext(GlobalContext);
    useEffect(()=>{
      getUser();
    // eslint-disable-next-line
    },[])


  return (
   
  <div>
    <Router>
     <NavigationBar /> 
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
    </Router>
  </div>
    
  )
}

export default App;
