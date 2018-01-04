import React, { Component } from 'react'
import { CognitoAuth } from "amazon-cognito-auth-js/dist/amazon-cognito-auth";
import appConfig from "../AppSync";

class LoginCallback extends Component {
  render() {
    var auth = new CognitoAuth(appConfig)
    auth.useCodeGrantFlow()
    debugger
    return (
      <div>Login Callback</div>
    )
  }
}

export default LoginCallback
