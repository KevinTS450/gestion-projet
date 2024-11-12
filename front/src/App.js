import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/routes';
import NavBar from './components/Layout/navbar';
import Footer from './components/Layout/footer';
import Guards from './guards/guards';


const MainLayout = () => {
  const location = useLocation();
  const hasRoutes = location.pathname !== '/';



  return (
    <div className={`flex flex-col gap-10 ${hasRoutes ? 'h-full' : 'h-[500px]'}`}>
      <AppRoutes />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Guards>
        <NavBar />
        <MainLayout />
        <Footer />
      </Guards>

    </Router>
  );
};

export default App;
