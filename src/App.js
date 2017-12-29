import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './components/navbar'
import ChannelList from './containers/channel_list'
import ChannelDetail from './containers/channel_detail'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducers from './reducers'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <div className="App full-screen">
          <Navbar logo={logo} />
          <div className="main">
            <ChannelList />
            <ChannelDetail />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
