import React from 'react';

const initializeUser = null

const UserContext = React.createContext([initializeUser, () => {}]);

export default UserContext;