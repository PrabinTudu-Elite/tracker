import CssBaseline from '@mui/material/CssBaseline';
import { createHashRouter, RouterProvider, useLocation } from 'react-router';
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { redirect } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Layout from './components/layout/Layout';
import EmployeeList from './components/EmployeeList';
import EmployeeShow from './components/EmployeeShow';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';
import AppTheme from './shared-theme/AppTheme';
import { useEffect } from 'react';
import "./App.css";
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

const router = createHashRouter([
  {
    Component: DashboardLayout,
    children: [
      {
        path: '/employees',
        Component: EmployeeList,
      },
      {
        path: '/employees/:employeeId',
        Component: EmployeeShow,
      },
      {
        path: '/employees/new',
        Component: EmployeeCreate,
      },
      {
        path: '/employees/:employeeId/edit',
        Component: EmployeeEdit,
      },
      // Fallback route for the example routes in dashboard sidebar items
      {
        path: '*',
        Component: EmployeeList,
      },
    ],
  },
]);

const myrouter = createHashRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/vehicles',
        Component: VehicleList,
      },
      {
        path: '/vehicles/:vehicleId',
        Component: VehicleShow,
      },
      {
        path: '/vehicles/new',
        Component: VehicleCreate,
      },
      {
        path: '/vehicles/:vehicleId/edit',
        Component: VehicleEdit,
      },
      {
        path: '/auth/login',
        Component: Login,
      },
      {
        path: '/auth/logout',
        Component: Logout,
      },
      {
        path: '/auth/Register',
        Component: Register,
      },
      // Fallback route for the example routes in dashboard sidebar items
      {
        path: '*',
        Component: Home,
      },
    ],
  },
]);

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function App(props) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const username = userData?.username;

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      window.location = '#/auth/login';
      //  redirect("#/auth/login");
    }
  }, []);

  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={myrouter} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
