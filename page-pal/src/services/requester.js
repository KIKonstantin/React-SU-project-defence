const requester = async (method, url, data) => {
    const options = {
      headers: {},
    };
  
    if (method !== 'GET') {
      options.method = method;
  
      if (data) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
      }
    }
  
    const serializedAuth = localStorage.getItem('auth');
    if (serializedAuth) {
      const auth = JSON.parse(serializedAuth);
  
      if (auth.accessToken) {
        options.headers['X-Authorization'] = auth.accessToken;
      }
    }
  
    try {
      const response = await fetch(url, options);
  
      if (response.status === 204) {
        return {};
      }else if(response.status === 403){
        throw new Error('User not found');
      }else if(response.status === 400) {
        throw new Error('All fileds are required');
      }
      else if(response.status === 404) {
        throw new Error('Page not found'); 
      }
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(response.statusText); 
      }
  
      return result;
    } catch (error) {
      if (error instanceof TypeError) { 
        return { error: 'Network error' };
      }
  
      return { error }; 
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
  