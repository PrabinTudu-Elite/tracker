import CssBaseline from '@mui/material/CssBaseline';
import { createHashRouter, RouterProvider } from 'react-router';
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { redirect } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Layout  from './components/layout/Layout';
import LoginLayout from './components/layout/LoginLayout';
import EmployeeList from './components/EmployeeList';
import EmployeeShow from './components/EmployeeShow';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';
import AppTheme from './shared-theme/AppTheme';
import { useEffect } from 'react';
import "./App.css";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import SattronIcon from './components/layout/SattronIcon';
import { Outlet } from 'react-router';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './theme/customizations';
import VehicleList from './components/vehicle/VehicleList';
import VehicleShow from './components/vehicle/VehicleShow';
import VehicleCreate from './components/vehicle/VehicleCreate';
import VehicleEdit from './components/vehicle/VehicleEdit';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Register from './components/auth/Register';

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function App(props) {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const username = userData?.username;

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      // window.location.href = '/auth/login';
      navigate('/auth/login');
    }
  }, [navigate]);



  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          {/* <RouterProvider router={myrouter} /> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/home" element={<Home />} />
              <Route path="/vehicles" element={<VehicleList />} />
              <Route path="/vehicles/:vehicleId" element={<VehicleShow />} />
              <Route path="/vehicles/new" element={<VehicleCreate />} />
              <Route path="/vehicles/:vehicleId/edit" element={<VehicleEdit />} />
            </Route>
            <Route path="/auth" element={<LoginLayout />}>
              <Route index path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
