import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';

// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom'

// AppSync
import appSyncConfig from './AppSync'
import { ApolloProvider } from 'react-apollo'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'

// My code
import './App.css';
import Login from './Components/Login'
import LoginCallback from './Components/LoginCallback'
import ChannelList from './Components/ChannelList'
import ChannelDetail from './Components/ChannelDetail'


// ********************************
// EXPERIMENT
// ********************************
// Try getting the login flow to start here.
import { CognitoAuth } from "amazon-cognito-auth-js/dist/amazon-cognito-auth";
var auth = new CognitoAuth(appSyncConfig)
auth.useCodeGrantFlow()
auth.userhandler = {
  onSuccess: (result) => {
    console.log(['Success', result])
    jwtToken = result.idToken.jwtToken
  },
  onFailure: (err) => console.log(['Error', err])
}
var jwtToken = ''
const code = new URLSearchParams(window.location.search.slice(1)).get('code')
if (code) {
  console.log(`Code: ${code}`)
  auth.getCodeQueryParameter(window.location.toString())
} else {
  console.log('Logging in')
  auth.getSession()
}
// With code, swap code for token
// Get jwt
// set jwt in client
console.log(["Setting the client", { jwtToken }])

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    jwtToken,
  }
})

const NoChannel = () => (
  <div className="main">
    <ChannelList />
    <h2>No Channel Selected</h2>
  </div>
)
class App extends Component {
  render() {
    // Here is where I'd need to check to see if I have a callback code,
    // exchange for the token, initialize a client (above) with that JWT, and
    // then redirect here, and then be on my merry way.
    //
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Router>
            <div className="App full-screen">
              <Route exact={true} path="/" component={NoChannel} />
              <Route path="/channels/:id" component={ChannelDetail} />
              <Route path="/login" component={Login} />
              <Route path="/login-callback" component={NoChannel} />
            </div>
          </Router>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default App
