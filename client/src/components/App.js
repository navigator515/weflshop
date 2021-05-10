import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
// import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import DetailProductPage from './views/DetailProductPage/DetailProductPage'
import Home from "./views/Home/Home"


import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside
 function Auth(SpecificComponent, option, adminRoute = null) {
   
  function AuthenticationCheck(props) {

      let user = useSelector(state => state.user);
      const dispatch = useDispatch();

      useEffect(() => {
          //To know my current status, send Auth request 
          dispatch(auth()).then(response => {
              //Not Loggined in Status 
              if (!response.payload.isAuth) {
                  if (option) {
                      props.history.push('/login')
                  }
                  //Loggined in Status 
              } else {
                  //supposed to be Admin page, but not admin person wants to go inside
                  if (adminRoute && !response.payload.isAdmin) {
                      props.history.push('/')
                  }
                  //Logged in Status, but Try to go into log in page 
                  else {
                      if (option === false) {
                          props.history.push('/')
                      }
                  }
              }
          })

      }, [])

      return (
          <SpecificComponent {...props} user={user} />
      )
  }
  return AuthenticationCheck
}



function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />

        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
}

export default App;
