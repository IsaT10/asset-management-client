import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home';
import SignupForEmployee from '../pages/Signup/SignupForEmployee';
import CustomRequest from '../pages/CustomRequest/CustomRequest';
import EmployeeHome from '../pages/EmployeeHome/EmployeeHome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/custom-request', element: <CustomRequest /> },
      { path: '/employee-home', element: <EmployeeHome /> },
    ],
  },
  {
    path: 'signupAsEmployee',
    element: <SignupForEmployee />,
  },
]);

export default router;
