import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore'
import 'firebase/auth'
import { config } from './config';


firebase.initializeApp(config);

export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const fireStore = firebase.firestore();

export default firebase;