import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
// const redirect = { redirectUri: window.location.origin };

root.render(
    <Auth0Provider
            domain="dev-oetwstbp2vmrwsdp.us.auth0.com"
            clientId="F6Dpcofti2HBbwiYa1MY46OavSV1Ca54"
            redirectUri = { window.location.origin }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Auth0Provider>
);


