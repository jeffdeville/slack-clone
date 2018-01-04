import React, { Component } from 'react'
import { CognitoAuth } from "amazon-cognito-auth-js/dist/amazon-cognito-auth";
import appConfig from '../AppSync'

class Login extends Component {
  render() {
    console.log(this.props)
    var auth = new CognitoAuth(appConfig);
    auth.useCodeGrantFlow()
    return auth.getSession()

    // debugger;
    // const session = auth.getSession();
    // console.log(session);
    // debugger;
    // return <div>Login</div>
  }


}

export default Login
