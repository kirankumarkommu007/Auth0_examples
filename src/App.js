import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';



function App() {
  const { isLoading, isAuthenticated, user,getAccessTokenSilently,  loginWithRedirect, logout } = useAuth0();
  const [apiResponse , setApiResponse] = useState(null);

   
  const fetchPublicAPI = async () => {
    try {
      
      const response = await axios.get("http://localhost:3001/api/public");
      console.log(response.data.message)
      setApiResponse(response.data.message);
    } catch (error) {
      console.error('Failed to fetch public API:', error);
      setApiResponse('Error fetching public API'); 
    }
  };

  const fetchProtectedAPI=async()=>{
    try {
      const accessToken=await getAccessTokenSilently();
      const response = await axios.get('http://localhost:3001/api/private', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      setApiResponse(response.data.message);
      console.log(response.data.message,+" "+accessToken)
      }
    catch (error) {
      console.error('Failed to fetch public API:', error);
      setApiResponse('Error fetching protected API'); 
      
    }
  };

  const fetchScopedAPI=async()=>{
    try {
      const accessToken = await getAccessTokenSilently({
        scope: 'read:resource' 
      });
      const response = await axios.get('http://localhost:3001/api/private-scoped', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      setApiResponse(response.data.message);
      console.log(response.data.message,+" "+accessToken)
      }
    catch (error) {
      console.error('Failed to fetch public API:', error);
      setApiResponse('Error fetching protected API'); 
      
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={loginWithRedirect}>Log in</button>
      )}

      {isAuthenticated && (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
          <button onClick={fetchProtectedAPI} >Fetch Private API</button>
          <button onClick={fetchPublicAPI}>Fetch Public API</button>
          <button onClick={fetchScopedAPI}>Fetch Scoped API</button>
          
          {apiResponse ? (
            <p>Response Message: {apiResponse}</p>
          ) : (
            <p>No data fetched yet</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;