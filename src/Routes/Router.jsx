import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home';
import SignupForEmployee from '../pages/Signup/SignupForEmployee';
import EmployeeHome from '../pages/EmployeeHome/EmployeeHome';
import MyAssets from '../pages/MyAssets/MyAssets';
import SignupForHR from '../pages/Signup/SignupForHR';
import Login from '../pages/Login/Login';
import AddAsset from '../pages/AddAsset/AddAsset';
import AssetsList from '../pages/AssetsList/AssetsList';
import RequestForAsset from '../pages/RequestForAsset/RequestForAsset';
import AllRequest from '../pages/AllRequest/AllRequest';
import AllCustomRequest from '../pages/AllCustomRequest/AllCustomRequest';
import EmployeeList from '../pages/EmployeeList/EmployeeList';
import Profile from '../pages/Shared/Profile';
import AddAnEmployee from '../pages/AddAnEmployee/AddAnEmployee';
import MyTeam from '../pages/MyTeam/MyTeam';
import PrivateRoute from './PrivateRoute';
import HrHome from '../pages/HrHome/HrHome';
import HrRoute from './HrRoute';
import PackagesPage from '../pages/Packages/PackagesPage';
import CustomRequestForm from '../pages/CustomRequestForm/CustomRequestForm';
import Details from '../pages/Details/Details';
import Payment from '../pages/Payment/Payment/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/custom-request',
        element: (
          <PrivateRoute>
            <CustomRequestForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/employee-home',
        element: (
          <PrivateRoute>
            <EmployeeHome />
          </PrivateRoute>
        ),
      },
      {
        path: '/requestForAsset',
        element: (
          <PrivateRoute>
            <RequestForAsset />
          </PrivateRoute>
        ),
      },
      {
        path: '/myTeam',
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },

      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/details',
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      //HR
      {
        path: '/assets',
        element: (
          <PrivateRoute>
            <MyAssets />
          </PrivateRoute>
        ),
      },
      {
        path: '/',
        element: (
          <HrRoute>
            <HrHome />
          </HrRoute>
        ),
      },
      {
        path: '/addAnAsset',
        element: (
          <PrivateRoute>
            <AddAsset />
          </PrivateRoute>
        ),
      },
      {
        path: '/assetsList',
        element: (
          <HrRoute>
            <AssetsList />
          </HrRoute>
        ),
      },
      {
        path: '/allRequest',
        element: (
          <HrRoute>
            <AllRequest />
          </HrRoute>
        ),
      },
      {
        path: '/allCustomRequest',
        element: (
          <HrRoute>
            <AllCustomRequest />
          </HrRoute>
        ),
      },
      {
        path: '/addEmployee',
        element: (
          <HrRoute>
            <AddAnEmployee />
          </HrRoute>
        ),
      },
      {
        path: '/myEmployee',
        element: (
          <HrRoute>
            <EmployeeList />
          </HrRoute>
        ),
      },
      {
        path: '/payment',
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'signupAsEmployee',
    element: <SignupForEmployee />,
  },
  {
    path: 'signupAsHR',
    element: <SignupForHR />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'packages',
    element: <PackagesPage />,
  },
]);

export default router;
