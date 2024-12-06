// frontend/src/utils/auth.js

export const checkAuth = () => {
    return localStorage.getItem('userToken') !== null;
  };
  