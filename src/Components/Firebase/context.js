import React from 'react';

const initializeUser = null

const FirebaseContext = React.createContext([initializeUser, () => {}]);

export default FirebaseContext;