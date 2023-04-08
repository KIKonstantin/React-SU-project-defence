const requester = async (method, url, data) => {
    const options = {
      headers: {}, // Always set headers, even if empty
    };
  
    if (method !== 'GET') {
      options.method = method;
  
      if (data) {
        options.headers['content-type'] = 'application/json'; // Set content-type header
        options.body = JSON.stringify(data);
      }
    }
  
    const serializedAuth = localStorage.getItem('auth');
    if (serializedAuth) {
      const auth = JSON.parse(serializedAuth);
  
      if (auth.accessToken) {
        options.headers['X-Authorization'] = auth.accessToken; // Set X-Authorization header
      }
    }
  
    try {
      const response = await fetch(url, options);
  
      if (response.status === 204) {
        return {};
      }
  
      if (response.status === 404) {
        throw new Error('Page not found'); // Create new instance of Error object with error message
      }
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(response.statusText); // Use response.statusText as error message
      }
  
      return result;
    } catch (error) {
      if (error instanceof TypeError) { // Catch specific error type
        return { error: 'Network error' };
      }
  
      return { error }; // Return error object
    }
  };
  
  export const requestFactory = () => {
    return {
      get: requester.bind(null, 'GET'),
      post: requester.bind(null, 'POST'),
      put: requester.bind(null, 'PUT'),
      patch: requester.bind(null, 'PATCH'),
      delete: requester.bind(null, 'DELETE'),
    };
  };
  