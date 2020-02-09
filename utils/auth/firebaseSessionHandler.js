import axios from 'axios';

export const setSession = user => {
  // Log in.
  if (user) {
    return user.getIdToken().then(token => {
      return axios('/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        data: { token }
      });
    });
  }

  // Log out.
  return axios('/api/logout', {
    method: 'POST',
    withCrendentials: true
  });
};
