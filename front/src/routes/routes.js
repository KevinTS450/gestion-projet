import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthPages from '../pages/Auth/AuthPages';
import RegisterPages from '../pages/Auth/RegisterPages';
import ProfilePage from '../pages/Home/profile/profilePage';
import ProjectPages from '../pages/Project/projectPage';
import UserManagePage from '../pages/UserManage/UserManagePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPages />} />
      <Route path="/ListUser" element={<UserManagePage />} />

      <Route path="/register" element={<RegisterPages />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/project" element={<ProjectPages />} />

     
    </Routes>
  );
};

export default AppRoutes;