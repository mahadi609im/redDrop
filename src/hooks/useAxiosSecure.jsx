import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: 'https://red-drop-server-tawny.vercel.app',
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const reqInterceptors = axiosSecure.interceptors.request.use(config => {
      const token = user?.accessToken || user?.stsTokenManager?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // interceptors response;
    const resInterceptors = axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          console.warn('Unauthorized access:', error.response?.data?.message);
          await logoutUser();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);
      axiosSecure.interceptors.response.eject(resInterceptors);
    };
  }, [user, logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
