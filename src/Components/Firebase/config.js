console.log('node env ', process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === 'production';
export const config = {
    apiKey: isProd ? process.env.REACT_APP_API_KEY_PROD : process.env.REACT_APP_API_KEY,
    authDomain: isProd ? process.env.REACT_APP_AUTH_DOMAIN_PROD : process.env.REACT_APP_AUTH_DOMAIN,
    projectId: isProd ? process.env.REACT_APP_PROJECT_ID_PROD : process.env.REACT_APP_PROJECT_ID,
    storageBucket: isProd ? process.env.REACT_APP_STORAGE_BUCKET_PROD : process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: isProd ? process.env.REACT_APP_MESSAGING_SENDER_ID_PROD : process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: isProd ? process.env.REACT_APP_ID_PROD : process.env.REACT_APP_ID,
    measurementId: isProd ? process.env.REACT_APP_MEASUREMENT_ID_PROD : process.env.REACT_APP_MEASUREMENT_ID
  };