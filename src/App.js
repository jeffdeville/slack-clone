import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './components/navbar'
import ChannelList from './components/channel_list'
import ChannelDetail from './components/channel_detail'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App full-screen">
        <Navbar logo={logo} />
        <div className="main">
          <ChannelList />
          <ChannelDetail />
        </div>
      </div>
    );
  }
}

export default App;
