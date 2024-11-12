import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { serviceConfig } from '../config/Service.config';

const Guards = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const token = serviceConfig.getToken();

  useEffect(() => {
    const isAuthPage = ['/auth', '/register'].includes(location.pathname);
    
    if (token && !serviceConfig.isTokenExpired()) {
      if (isAuthPage) {
        navigate('/profile');
      }
    } else if (serviceConfig.isTokenExpired()) {
      if (!isAuthPage) {
        
        navigate('/auth');
      }
    }
  }, [token, navigate, location.pathname]);

  return <>{children}</>;
};

export default Guards;
