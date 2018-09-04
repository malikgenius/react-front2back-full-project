import React, { Component } from 'react';
import './mySidenav.css';

export default class mySidenav extends Component {
  //   openNav = () => {
  //     document.getElementById('mySidenav').style.width = '250px';
  //   };

  //   closeNav = () => {
  //     document.getElementById('mySidenav').style.width = '0';
  //   };

  render() {
    return (
      <div>
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onclick={this.closeNav}>
            &times;
          </a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>

        <h2>Animated Sidenav Example</h2>
        <p>Click on the element below to open the side navigation menu.</p>
        <span style="font-size:30px;cursor:pointer" onclick={this.openNav}>
          &#9776; open
        </span>
      </div>
    );
  }
}
