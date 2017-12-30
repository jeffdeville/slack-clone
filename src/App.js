import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import appSyncConfig from './AppSync'
import { ApolloProvider } from 'react-apollo'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'

import './App.css';
import logo from './logo.svg';
import Navbar from './Components/Navbar'
import ChannelList from './Components/ChannelList'
import ChannelDetail from './Components/ChannelDetail'

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey
  }
})

const NoChannel = () => (
  <h2>No Channel Selected</h2>
)
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <div className="App full-screen">
            <Navbar logo={logo} />
            <Router>
              <div className="main">
                <ChannelList />
                <Route exact={true} path="/" component={NoChannel} />
                <Route path="/channels/:id" component={ChannelDetail} />
              </div>
            </Router>
          </div>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default App;
