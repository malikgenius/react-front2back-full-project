import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// CSS File Loaded
import './App.scss';
// Components
import HeaderBootStrap from './Components/HeaderBootStrap';
import HomeSection from './Components/HomeSection';
import GoogleLogin from './Components/SocialLogin/Google';
import FooterModal from './Components/Footer-Modal';
//FontAwesome and BootStrap config
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// library.add(faStroopwafel);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderBootStrap />
          <Switch>
            <Route exact path="/" component={HomeSection} />
            <Route path="/google" component={GoogleLogin} />
            {/* <Route path="/contact" component={FooterModal} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
