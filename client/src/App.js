import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// CSS File Loaded
import './App.scss';
//Store Actions etc
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { Provider } from 'react-redux';
import configureStore from './reducers';
// Components
import HeaderNavbar from './Components/HeaderNavbar';
import HomeSection from './Components/HomeSection';
import GoogleOauth from './Components/SocialLogin/GoogleOauth';
import FacebookOauth from './Components/SocialLogin/FacebookOauth';
// Email verification Reset Password ---
import VerifyAccount from './Components/verifyReset/VerifyAccount';
import EmailVerified from './Components/verifyReset/EmailVerified';
import ForgotPassword from './Components/verifyReset/ForgotPassword';
import ChangePassword from './Components/verifyReset/ChangePassword';
//FontAwesome and BootStrap config
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// Store
const store = configureStore();

// check for user
if (localStorage.jwtToken) {
  //Set Auth token header auth setAuthToken function makes sure that Authorization Headers have the token.
  // if we dont do this, token will be in localStorage only but not in headers to verify with backend.
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <HeaderNavbar />
            <Switch>
              <Route exact path="/" component={HomeSection} />
              <Route path="/google" component={GoogleOauth} />
              <Route path="/facebook" component={FacebookOauth} />
              <Route path="/verifyAccount" component={VerifyAccount} />
              <Route path="/emailverified" component={EmailVerified} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/changepassword" component={ChangePassword} />
            </Switch>
            {/* <FooterModal /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
