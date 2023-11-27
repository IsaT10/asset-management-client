import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home';
import SignupForEmployee from '../pages/Signup/SignupForEmployee';
import CustomRequest from '../pages/CustomRequest/CustomRequest';
import EmployeeHome from '../pages/EmployeeHome/EmployeeHome';
import MyAssets from '../pages/MyAssets/MyAssets';
import SignupForHR from '../pages/Signup/SignupForHR';
import Login from '../pages/Login/Login';
import HrHome from '../pages/HrHome/HrHome';
import AddAsset from '../pages/AddAsset/AddAsset';
import AssetsList from '../pages/AssetsList/AssetsList';
import RequestForAsset from '../pages/RequestForAsset/RequestForAsset';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/custom-request', element: <CustomRequest /> },
      { path: '/employee-home', element: <EmployeeHome /> },
      { path: '/requestForAsset', element: <RequestForAsset /> },

      //HR
      { path: '/assets', element: <MyAssets /> },
      { path: '/HRhome', element: <HrHome /> },
      { path: '/addAnAsset', element: <AddAsset /> },
      { path: '/assetsList', element: <AssetsList /> },
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
]);

export default router;
