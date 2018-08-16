/* global gapi */

const API_KEY = 'YOURAPIKEYHERE';

import React, { Component } from 'react';

class App extends Component {

  loadYoutubeApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }

  render() {
    if (this.state.gapiReady) {
     return (
       <h1>GAPI is loaded and ready to use.</h1>
     );
  };
}

export default App;
