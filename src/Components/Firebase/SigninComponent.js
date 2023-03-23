import React from 'react';
import mixpanel from 'mixpanel-browser';
import firebase, {auth, analytics} from './index';

import { RegisterNewUser } from 'APIHelper';
import Lamp from "Assets/wish-gee-lamp.PNG"

const StyledFirebaseAuth = React.lazy(() => import('react-firebaseui/StyledFirebaseAuth'))

const getUIConfig = (successCB, closeModal) => ({
    signInFlow: 'popup',
    signInSuccessUrl: false,
    signInOptions: [
    //  firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          auth
            .currentUser.getIdTokenResult()
            .then(async (idTokenResult) => {
              if(closeModal){
                closeModal()
              }
              if (!idTokenResult.claims.is_registered) {
                
                await RegisterNewUser(idTokenResult.token, idTokenResult.signInProvider === "password" && auth.currentUser.displayName);
                if(!idTokenResult.claims.email_verified){
                  auth.currentUser.sendEmailVerification();
                }
                mixpanel.track('sign_up')
                analytics.logEvent('sign_up');
              }
              mixpanel.track('login', {value: 'success'})
              analytics.logEvent('login', {value: 'success'})
              if(successCB){
                successCB();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          // document.getElementById("loginModal").style.display = "none";
        },
      }
  });
   
  export default class SignInScreen extends React.Component {
    render() {
      const uiConfig = getUIConfig(this.props.onSuccess, this.props.closeModal)
      return (
        <div>
          <div className="profilephoto">
            <img src={Lamp} alt="wishgee logo" />
          </div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </div>
      );
    }
  }