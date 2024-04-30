import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-w7xbszr7dfzzla0z.us.auth0.com"
    clientId="rg24laiZWeR4D4fBzIwFQ2mDz0LWSvpu"
    authorizationParams={{
      redirect_uri: window.location.origin,
       audience:"https://example.com/api",
       scope:"read:resource"
    }}
  >
    <App />
  </Auth0Provider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
